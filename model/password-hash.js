const bcrypt = require('bcrypt');
const salts = 10;

function HashPassword() 
{
    
}

HashPassword.prototype.hashPassword = function hashPassword(rawPassword) 
{
    return bcrypt.hash(rawPassword, salts);
}

HashPassword.prototype.comparePassword = function comparePassword(rawPassword, hash) 
{
    return bcrypt.compare(rawPassword, hash)
        .then(result => result? Promise.resolve(): Promise.reject());
}


module.exports = new HashPassword();