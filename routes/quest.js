const express = require('express');
const router = express.Router();
const Quest = require('../model/quest');
const getConnection = require('../config/mongo-connection');
const mongodb = require('mongodb');

router.get('/', (request, response) => 
{
    getConnection()
        .then(connection => connection.collection('quest'))
        .then(collection => collection.find({userId: response.locals.userId, status: 1}))
        .then(cursor => cursor.toArray())
        .then(questCollection => response.status(200).send(questCollection))
})

router.post('/', (request, response, next) => 
{
    let quest = new Quest(request.body, response.locals.userId);
    quest.validate()
        .then(() => next())
        .catch(validationError => response.status(400).send(validationError))
})

router.post('/', (request, response) => 
{
    getConnection()
        .then(connection => connection.collection("quest").insert(new Quest(request.body,  response.locals.userId)))
        .then(() => response.status(201).send())
})

router.patch('/:id', (request, response) => 
{
    let queryById = {_id: mongodb.ObjectId.createFromHexString(request.params.id)};
    getConnection()
        .then(connection => connection.collection('quest'))
        .then(questCollection => questCollection.update(queryById, {$set: request.body}))
})

module.exports = router;