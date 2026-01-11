import { google } from 'googleapis';
const sheets = google.sheets('v4');

async function handler(req, res) {
  if (req.method === 'GET') {
    const { make, model } = req.query;

    const scopes = ['https://www.googleapis.com/auth/spreadsheets'];
    const jwt = new google.auth.JWT(
      process.env.EMIRATES_CAR_CLIENT_EMAIL,
      null,
      process.env.EMIRATES_CAR_FORMS_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes,
      null,
    );

    const readData = await sheets.spreadsheets.values.get({
      auth: jwt,
      spreadsheetId: process.env.EMIRATES_CAR_DATABASE_ID,
      range: 'emirates-car-sheet',
    });
    const values = readData.data.values;

    if (!values || values.length === 0) {
      return res.status(200).json([]);
    }

    const column = values[0];
    const dataRows = values.slice(1);

    const allEntries = dataRows.map(row => {
      const entry = {};
      column.forEach((column, index) => {
        entry[column] = row[index] || '';
      });
      return entry;
    })

    let filteredEntries = allEntries;
    if (make) {
      filteredEntries = filteredEntries.filter(entry => entry.BRAND && entry.BRAND.toLowerCase() === make.toLowerCase());
    }

    if (model) {
      filteredEntries = filteredEntries.filter(entry => entry.Model && entry.Model.toLowerCase() === model.toLowerCase());
    }

    const lastTenEntries = filteredEntries.slice(-10);
    res.status(200).json(lastTenEntries);

  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

export default handler;
