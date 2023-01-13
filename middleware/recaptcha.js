const axios = require('../libs/axios.lib');

require('dotenv').config();

async function checkRecaptcha(req, res, next) {

  try {

    const recaptcha = req.body["token"]
    if(recaptcha === undefined || recaptcha == "")
      throw new Error("Recaptcha not found !");

    const secret = process.env.PROPERTIE_SECRET_RECAPTCHA;
    const url = '/recaptcha/api/siteverify'
    const body = `secret=${secret}&response=${recaptcha}`
    const response = await axios.post(url, body);

    if (!response.data.success)
      throw new Error("Recaptcha not found !");

    next()
  } catch(err) {
      next(err);
  }


}

module.exports = checkRecaptcha
