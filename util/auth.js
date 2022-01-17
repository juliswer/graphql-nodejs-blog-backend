const jwt = require('jsonwebtoken');

const createJWTToken = user => {
    return jwt.sign({user}, 'julian123', {
        expiresIn: '1h'
    })
}

module.exports = {
    createJWTToken
}