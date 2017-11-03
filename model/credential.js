const jwt = require('jsonwebtoken');
const secret = 'a key';
const jwtOptions =  { algorithm: 'HS256' };

function Credential(user) 
{
    this.user = user;
}

Credential.prototype.getToken = function getToken() 
{
    return new Promise((resolve, reject) => 
    {
        jwt.sign({_id: this.user._id}, secret, jwtOptions, (error, token) =>
        {
            error ? reject(error) : resolve(token)
        })
    })
    
}

Credential.getUser = function getUser(token) 
{
    return new Promise((resolve, reject) => 
    {
        jwt.verify(token, secret, jwtOptions, function (error, result) 
        {
            error ? reject(error) : resolve(token)
        })
    }) 
}

module.exports = Credential;