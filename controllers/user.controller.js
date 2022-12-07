const jwt = require('jsonwebtoken');
const {UserDto, userSignup, getUser} = require('../models/user.model');

require('dotenv').config();


const createToken = (user) => {
  const SECRET = process.env.JWT_SECRET;
  return jwt.sign({id:user.id, email:user.email}, SECRET, { expiresIn: '2h' });
}

async function signupUser(req, res, next) {
  try {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress  || 'ip alınamadı';
    const {name_surname, e_mail, password} = req.body;
    const userDto = new UserDto(e_mail, password, name_surname);
    const user = await userSignup(userDto, ip);
    res.send({message:"User successfuly created!", token: createToken(user)});
  } catch(err) {
    return next(err);
  }
}

async function loginUser(req, res, next) {

  try {
    const {e_mail, password} = req.body;
    const userDto = new UserDto(e_mail, password);
    const user = await getUser(userDto);
    res.send({message:"User successfuly login!", token: createToken(user)});
  } catch(err) {
    return next(err);
  }

}


module.exports = {
  signupUser,
  loginUser
}
