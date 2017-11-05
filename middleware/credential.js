const Credential = require('../model/credential');

module.exports = function getCredential(request, response, next) 
{
    let token = request.headers['x-auth-token'];
    if(!token) return next() 

    Credential.getUser(token)
        .then(user => response.locals.userId = user._id)
        .then(() => next());
}