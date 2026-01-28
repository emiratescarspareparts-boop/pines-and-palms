import { google } from 'googleapis';
import nodemailer from 'nodemailer';

async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            // Define the required scopes
            const scopes = ['https://www.googleapis.com/auth/spreadsheets'];

            // Authenticate with the Google Sheets API
            const jwt = new google.auth.JWT(
                process.env.EMIRATES_CAR_CLIENT_EMAIL,
                null,
                process.env.EMIRATES_CAR_FORMS_PRIVATE_KEY.replace(/\\n/g, '\n'),
                scopes,
            );

            const sheets = google.sheets({ version: 'v4', auth: jwt });

            const readData = await sheets.spreadsheets.values.get({
                spreadsheetId: process.env.EMIRATES_CAR_DATABASE_ID,
                range: 'vw-inquiry',
            });

            const today = new Date();
            const thisYear = today.getFullYear();
            const rowCount = readData.data.values?.length || 0;
            const RefNo = thisYear.toString().substring(2) + '000' + (rowCount + 1);

            const { Timestamp, name, email, phone, address, partList } = req.body;
            console.log(Timestamp, name, email, partList)

            const formattedDescription = `Ref: ${'VW' + '-' + RefNo}\n${name}`;

            await sheets.spreadsheets.values.append({
                spreadsheetId: process.env.EMIRATES_CAR_DATABASE_ID,
                range: 'vw-inquiry',
                valueInputOption: 'USER_ENTERED',
                requestBody: {
                    values: [[Timestamp, RefNo, name, email, phone, address, partList]],
                },
            });

            if (process.env.TELEGRAM_BOT && process.env.CHAT_ID) {
                const message = `${formattedDescription}%0A We received your inquiry for car auto parts.`;
                const encodedMessage = encodeURIComponent(message);
                const telegramUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT}/sendMessage?chat_id=${process.env.CHAT_ID}&text=${encodedMessage}`;

                try {
                    await fetch(telegramUrl);
                } catch (err) {
                    console.error('Telegram notification failed:', err);
                }
            }

            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'emiratesautomobileparts@gmail.com',
                    pass: process.env.PASSKEY,
                },
            });

            const mailOptions = {
                from: 'emiratesautomobileparts@gmail.com',
                to: 'haksinterlance@gmail.com',
                subject: `${partList} ${address} Order Received`,
                text: `${Timestamp}\nRefNo: ${RefNo}\n${formattedDescription}\nContact: ${phone}\nView on WhatsApp: https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(
                    formattedDescription,
                )}`,
            };

            await transporter.sendMail(mailOptions);

            // Respond with success
            res.status(201).json({ message: 'Data submitted successfully' });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal server error', error });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}

export default handler;