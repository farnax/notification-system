const { createTransport } = require('nodemailer');

const smtpConfig = createTransport({
    host: process.env.MAIL_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
   }
});

const sendEmail = async (recipient, notifications ) => {
    try {
        const transport = createTransport(smtpConfig);
        const text = getMessageText(notifications);
        const mailOptions = {
            from: process.env.MAIL_USER,
            to: recipient,
            subject: 'Automatic notification',
            text
        };

        await transport.sendMail(mailOptions);
    } catch (err) {
        console.log(`It is impossible to send an email due to ${err}`);
    }
};

const getMessageText = notifications => {
    let text = 'The following events occurred: ';

    for (const notify of notifications) {
        const { type, fileName, date } = notify;
        const message = `${type} type event over the ${fileName} file at ${date}; `;
        text += message;
    }

    return text;
}

module.exports = { sendEmail };
