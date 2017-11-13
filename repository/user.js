const getConnection = require('../config/mongo-connection');
const mongodb = require('mongodb');

function UserRepository() 
{
    
}

UserRepository.prototype.getCollection = function () 
{
    return getConnection().then(connection => connection.collection('user'));
}

UserRepository.prototype.getQueryByNameOrEmail = function getQueryByNameOrEmail(name, email) 
{
    return { $or: [ {name: name || ''}, { email: email || ''}] };
}

UserRepository.prototype.findByNameOrEmail = function findByNameOrEmail(name, email) 
{
    let queryByNameOrEmail = this.getQueryByNameOrEmail(name, email);
    return this.getCollection().then(collection => collection.findOne(queryByNameOrEmail));
}

UserRepository.prototype.findById = function findById(userId) 
{
    let queryById = {_id: mongodb.ObjectId.createFromHexString(userId)};
    return this.getCollection().then(userCollection => userCollection.findOne(queryById))
}

module.exports = new UserRepository();