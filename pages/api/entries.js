import { google } from 'googleapis';
const sheets = google.sheets('v4');

let cache = { data: null, timestamp: 0 };
const CACHE_TTL = 60 * 1000; // 60 seconds

async function getSheetData() {
  const now = Date.now();
  if (cache.data && (now - cache.timestamp) < CACHE_TTL) {
    return cache.data;
  }

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
    range: 'display-inquiry',
  });

  cache = { data: readData.data.values, timestamp: now };
  return cache.data;
}

async function handler(req, res) {
  if (req.method === 'GET') {
    const { make, model } = req.query;
    const values = await getSheetData();

    if (!values || values.length === 0) {
      return res.status(200).json([]);
    }

    const column = values[0];
    const dataRows = values.slice(1);
    const allEntries = dataRows.map(row => {
      const entry = {};
      column.forEach((col, index) => { entry[col] = row[index] || ''; });
      return entry;
    });

    let filteredEntries = allEntries;
    if (make) filteredEntries = filteredEntries.filter(e => e.BRAND?.toLowerCase() === make.toLowerCase());
    if (model) filteredEntries = filteredEntries.filter(e => e.Model?.toLowerCase() === model.toLowerCase());

    res.setHeader('X-Robots-Tag', 'noindex');
    res.status(200).json(filteredEntries.slice(-10));
  } else {
    res.setHeader('X-Robots-Tag', 'noindex');
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

export default handler;