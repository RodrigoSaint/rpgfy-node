const bcrypt = require('bcrypt');
const salts = 10;

module.exports = function hashPassword(rawPassword) 
{
    return bcrypt.hash(rawPassword, salts);
}