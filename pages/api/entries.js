import { google } from 'googleapis';
const sheets = google.sheets('v4');

async function handler(req, res) {
  if (req.method === 'GET') {
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
    const startIndex = Math.max(values.length - 10, 0);
    const data = values.slice(-10);
    const columns = values.shift();

    const dataValue = values.slice(startIndex).map(row => {
      const entry = {};
      columns.forEach((column, index) => {
        entry[column] = row[index] || '';
      });
      return entry;
    });

    res.status(201).json(dataValue);
  } else {
    res.status(200).json({ message: 'error' });
  }
}

export default handler;
