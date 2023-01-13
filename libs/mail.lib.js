
require('dotenv').config();

const sendMail = async (to, subject, message) => {

  try {

    const mailjet = require('node-mailjet').apiConnect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);
    const from = 'noreply.properti@kaydeder.com';
    const send = mailjet.post('send', { version: "v3.1" });
    const requestObject = {
      Messages:[{
        From: {
            Email: from,
            Name: 'Properti Site Admin'
        },
        To: [{
            Email: to
        }],
        Subject: subject,
        TextPart: message,
        HTMLPart: `<h1>${message}</h1>`
    }]};

    await send.request(requestObject)

  } catch (err) {
    console.log("Mail send error", err);
  }

}

module.exports = { sendMail }
