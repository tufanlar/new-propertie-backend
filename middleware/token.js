const jwt = require('jsonwebtoken');

require('dotenv').config();


const checkToken = async (req,res,next) => {

    try {
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress  || 'ip alınamadı';
        const token = req.headers.authorization
        const {id, email} = jwt.verify(token, process.env.JWT_SECRET)

        if( email === undefined )
            throw new Error("Token not vaild or expired !")

        req.user_id = id;
        req.user_ip = ip;

        next()
    } catch(err) {
        next(err);
    }

}

module.exports = checkToken;
