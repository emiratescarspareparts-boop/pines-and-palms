import { google } from 'googleapis';
import nodemailer from 'nodemailer';

const sheets = google.sheets('v4');

async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const scopes = ['https://www.googleapis.com/auth/spreadsheets'];

        const jwt = new google.auth.JWT(
            process.env.EMIRATES_CAR_CLIENT_EMAIL,
            null,
            process.env.EMIRATES_CAR_FORMS_PRIVATE_KEY.replace(/\\n/g, '\n'),
            scopes
        );

        // Read rows for RefNo
        const readData = await sheets.spreadsheets.values.get({
            auth: jwt,
            spreadsheetId: process.env.EMIRATES_CAR_DATABASE_ID,
            range: 'supplier-sheets',
        });

        const today = new Date();
        const year = today.getFullYear().toString().substring(2);
        const RefNo = `SUP${year}000${readData.data.values.length + 1}`;

        const {
            Timestamp,
            supplierType,
            whatsapp,
            country,
            email,
            partsType,
            partsCondition,
            makes,
        } = req.body;

        const description =
            'Ref: ' + RefNo + '\n' +
            'Supplier Type: ' + supplierType + '\n' +
            'WhatsApp: ' + whatsapp + '\n' +
            'Country: ' + country + '\n' +
            'Email: ' + email + '\n' +
            'Parts Type: ' + partsType + '\n' +
            'Condition: ' + partsCondition + '\n' +
            'Makes Supplied: ' + makes;

        // Append to Sheet
        const response = await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.EMIRATES_CAR_DATABASE_ID,
            range: 'supplier-sheets',
            valueInputOption: 'USER_ENTERED',
            auth: jwt,
            requestBody: {
                values: [
                    [
                        Timestamp,
                        RefNo,
                        email,
                        whatsapp,
                        country,
                        partsType,
                        partsCondition,
                        makes,
                        description,
                    ],
                ],
            },
        });

        // Optional email notification
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'emiratesautomobileparts@gmail.com',
                pass: process.env.PASSKEY,
            },
        });

        await transporter.sendMail({
            from: 'emiratesautomobileparts@gmail.com',
            to: 'emiratesautomobileparts@gmail.com',
            subject: `New Supplier Added – ${country}`,
            text: description,
        });

        return res.status(201).json({ success: true, ref: RefNo, response });
    } catch (error) {
        console.error('Supplier API error:', error);
        return res.status(500).json({ error: 'Failed to save supplier' });
    }
}

export default handler;