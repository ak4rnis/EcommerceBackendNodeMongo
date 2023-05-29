const jwt = require("jwt-simple");
const moment = require('moment');
const secret = 'drakarnis';

exports.createToken = function(user){
    const payload = {
        sub: user._id,
        nombres: user.nombres,
        apellidos: user.apellidos,
        email: user.email,
        role: user.rol,
        iat: moment().unix(),
        exp: moment().add(10000, 'years').unix()
    }
    return jwt.encode(payload, secret);
}