const Credential = require('../model/credential');

module.exports = function getCredential(request, response, next) 
{
    let token = request.headers['X-Auth-Token'];
    if(token) 
        response.locals.userId = Credential.getUser(token);
    next();
}