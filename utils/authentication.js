const JWT = require('jsonwebtoken');

const secret = 'mysecret';

function createTokenForUser(user) {
    const payload = {
        _id : user._id,
        email : user.email,
        role: user.role,
    };
    const token = JWT.sign(payload, secret);
    return token;
}

function validateToken(token){
  try {
    // console.log('Received token:', token);
    const payload = JWT.verify(token, secret);
    return payload;
  } catch (error) {
    console.error('Token validation error:', error);
    throw new Error('Token validation error');
  }
}

module.exports = {
    createTokenForUser,
    validateToken
}