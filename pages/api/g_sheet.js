import { google } from 'googleapis';
const sheets = google.sheets('v4');
import nodemailer from 'nodemailer';

async function handler(req, res) {
  if (req.method === 'POST') {
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

    const today = new Date();
    const thisYear = today.getFullYear();
    const RefNo =
      thisYear.toString().substring(2) +
      '000' +
      (readData.data.values.length + 1);
    const Timestamp = req.body.Timestamp;
    const name = req.body.name;
    const brand = req.body.brand;
    const contact = req.body.contact;
    const description = 'Ref: ' + RefNo + '\n' + req.body.description;
    const partList = req.body.partList;
    const email = req.body.email;
    const year = req.body.year;
    const model = req.body.model;
    const address = req.body.address;
    const condition = req.body.condition || '';
    const timing = req.body.timing || '';
    const WApp = null;
    const SCnfD = null;
    const Y = null;
    const N = null;
    const Q = null;
    const Follow = null;
    const S = null;


    let messageURIOne =
      encodeURI(description) +
      '%0AWe%20received%20your%20enquiry%20for%20car%20auto%20parts%20for%20above%20vehicle ';

    const wap = `https://api.whatsapp.com/send?phone=${contact}&text=${encodeURI(
      description,
    )}`

    fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT
      }/sendMessage?chat_id=${process.env.CHAT_ID}&text=${messageURIOne +
      '\n' + wap +
      'https://api.whatsapp.com/send?phone=' +
      contact +
      '&text=' +
      messageURIOne
      }`,
    );

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.EMIRATES_CAR_DATABASE_ID,
      range: 'emirates-car-sheet',
      valueInputOption: 'USER_ENTERED',
      auth: jwt,
      requestBody: {
        values: [
          [
            Timestamp,
            RefNo,
            email,
            brand,
            contact,
            description,
            partList,
            year,
            model,
            address,
            condition,
            timing,
            WApp,
            SCnfD,
            Y,
            N,
            Q,
            Follow,
            S
          ],
        ],
      },
    });
    const data = JSON.stringify(response);
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'emiratesautomobileparts@gmail.com',
        pass: process.env.PASSKEY,
      },
    });

    var details = `${RefNo +
      '\n' +
      'We received an inquiry for ' +
      '\n' +
      description +
      'Do you still require it?'
      }`;
    var detailEncode = encodeURI(details);

    // Prepare email message
    const mailOptions = {
      from: 'emiratesautomobileparts@gmail.com',
      to: 'haksinterlance@gmail.com',
      subject: `${year + ' ' + brand + ' ' + model + ' ' + address + ' Order Received'
        }`,
      text: `${Timestamp +
        '\n' +
        RefNo +
        '\n' +
        description +
        '\n' +
        `https://api.whatsapp.com/send?phone=${contact}&text=${encodeURI(
          description,
        )}`
        }`,
    };

    const transporterCus = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'emiratesautomobileparts@gmail.com',
        pass: process.env.PASSKEY,
      },
    });

    var details = `${RefNo +
      '\n' +
      'We received an inquiry for ' +
      '\n' +
      description +
      'Do you still require it?'
      }`;
    var detailEncode = encodeURI(details);

    // Prepare email message
    const mailOptionsCus = {
      from: 'emiratesautomobileparts@gmail.com',
      to: email,
      subject: `EMIRATESCAR ${year} ${brand} ${model} ${address}`,
      text:
        `We have received the following inquiry:

${Timestamp}
${RefNo}
${description}

We will get back to you through WhatsApp based on stock availability.

Regards,
EMIRATESCAR
https://www.emirates-car.com
`
    };

    await transporter.sendMail(mailOptions);
    await transporterCus.sendMail(mailOptionsCus)
    res.status(201).json(data);
  } else {
    res.status(200).json({ message: 'error' });
  }
}

export default handler;
