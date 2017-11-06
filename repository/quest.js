/*
db.getCollection('quest').aggregate([
    {$match: {userId: '5a004f4e20e8f51a2c10b513', status: 2}},
    {$group: {_id: '$userId', total: {$sum: '$difficulty'}}}
])
*/
const mongodb = require('mongodb');
const getConnection = require('../config/mongo-connection');

function QuestRepository() 
{
    
}

QuestRepository.prototype.getCollection = function getCollection() 
{
    return getConnection().then(connection => connection.collection('quest'));
}

QuestRepository.prototype.getActiveQuestCollection = function getActiveQuestCollection(userId)
{
    return this.getCollection()
        .then(collection => collection.find({userId: userId, status: 1}))
        .then(cursor => cursor.toArray())
}

QuestRepository.prototype.updateQuest = function updateQuest(questId, content) 
{
    let queryById = {_id: mongodb.ObjectId.createFromHexString(questId)};
    return this.getCollection()
        .then(questCollection => questCollection.update(queryById, {$set: content}))
}

QuestRepository.prototype.getUserQuestExp = function (userId) {
    return this.getCollection().then(questCollection => questCollection.aggregate([
        {$match: {userId: userId, status: 2}},
        {$group: {_id: '$userId', experience: {$sum: '$difficulty'}}}
    ]).toArray())
    .then(aggregationResult => aggregationResult[0] || {})
}

module.exports = new QuestRepository();
