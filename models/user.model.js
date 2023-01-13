const bcrypt = require("bcryptjs");
const db = require('../libs/db');


class Role {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

class User {
  constructor(id, email, name , roles = []) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.roles = roles;
  }
}

class UserDto {
  constructor(email, password, name = ""){
    this.email = email;
    this.password = password;
    this.name = name;
  }
}

const userSignup = async (userDto, ipAddress) => {

  try {
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(userDto.password, salt);
    const params = [userDto.name, userDto.email, password, ipAddress];
    const { user_id } = await db.one(
          'insert into users(user_name, user_mail, user_password, ip_address)' +
          'values($1, $2, $3, $4) RETURNING user_id',
           params);
           //
    return new User(user_id, userDto.email, userDto.name);
  } catch(err) {
    console.log("Signup error", err);
    throw err;
  }

}

const getUser = async (userDto) => {

  try {
    const params = [userDto.email];
    const userInfo = await db.any('select user_id, user_name, user_password from users where user_mail=$1', params);
    if (userInfo.length !== 1) {
      throw new Error("Username or password wrong!");
    }
    const [{ user_id, user_name, user_password }] = userInfo;

    if(!bcrypt.compareSync(userDto.password, user_password)) {
      throw new Error("Username or password wrong!")
    }
    return new User(user_id, userDto.email, userDto.name);
  } catch(err) {
    console.log("Login error", err);
    throw err;
  }

}


const getPassword = async (email, ipAddress) => {

  try {
    const generator = require('generate-password');
    const password = generator.generate({
	       length: 8,
	        numbers: true
    });
    const salt = bcrypt.genSaltSync(10);
    const secret = bcrypt.hashSync(password, salt);
    const params = [email, secret, ipAddress];
    const result = await db.one(
          'update users SET user_mail = $1, user_password = $2, ip_address = $3 ' +
          'where user_mail = $1 RETURNING user_id',
           params);
           //
    console.log("Sonuç", result);
    return password;
  } catch(err) {
    console.log("getPassword error", err);
    throw err;
  }

}





module.exports = {
  UserDto,
  userSignup,
  getUser,
  getPassword
}
