const jwt = require('jsonwebtoken');
const {UserDto, userSignup, getUser, getPassword} = require('../models/user.model');
const {sendMail} = require('../libs/mail.lib');

require('dotenv').config();


const createToken = (user) => {
  const SECRET = process.env.JWT_SECRET;
  return jwt.sign({id:user.id, email:user.email}, SECRET, { expiresIn: '2h' });
}


async function signup(req, res, next) {
  try {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress  || 'ip alınamadı';
    const {name_surname, e_mail, password} = req.body;
    const userDto = new UserDto(e_mail, password, name_surname);
    const user = await userSignup(userDto, ip);
    const subject = `${name_surname} Your registration has successfuly received!`;
    const message = `${subject} Mail: ${e_mail} Password: ${password}`;
    await sendMail(userDto.email, subject, message);
    res.send({message, user, token: createToken(user)});
  } catch(err) {
    return next(err);
  }
}

async function forget(req, res, next) {
  try {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress  || 'ip alınamadı';
    const {e_mail} = req.body;
    const password = await getPassword(e_mail, ip);
    const subject = "Your password reseted!";
    const message = `Your new password: ${password}`;
    await sendMail(e_mail, subject, message);
    res.send({message});
  } catch(err) {
    return next(err);
  }
}

async function login(req, res, next) {

  try {
    const {e_mail, password} = req.body;
    const userDto = new UserDto(e_mail, password);
    const user = await getUser(userDto);
    res.send({message:"User successfuly login!", user, token: createToken(user)});
  } catch(err) {
    return next(err);
  }

}


module.exports = {
  signup,
  login,
  forget
}
