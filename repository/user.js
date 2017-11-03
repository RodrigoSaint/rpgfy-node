const getConnection = require('../config/mongo-connection');

function UserRepository() 
{
    
}

UserRepository.prototype.getCollection = function () 
{
    return getConnection().then(connection => connection.collection('user'));
}

UserRepository.prototype.getQueryByNameOrEmail = function getQueryByNameOrEmail(name, email) 
{
    return { $or: [ {name: name}, { email: email}] };
}

UserRepository.prototype.findByNameOrEmail = function findByNameOrEmail(name, email) 
{
    let queryByNameOrEmail = this.getQueryByNameOrEmail(name, email);
    return this.getCollection().then(collection => collection.findOne(queryByNameOrEmail));
}

module.exports = new UserRepository();