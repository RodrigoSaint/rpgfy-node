const express = require('express');
const router = express.Router();
const Quest = require('../model/quest');
const getConnection = require('../config/mongo-connection');

router.get('/', (request, response) => {
    response.send([
        {
          "_id": "123",
          "id": "123",
          "title": "a quest",
          "difficulty": 1,
          "dueDate": "10/10/10"
        },
        {
          "_id": "1234",
          "id": "1234",
          "title": "a quest 2",
          "difficulty": 2,
          "dueDate": "10/10/10"
        }
      ])
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
        .then(connection => connection.collection("quest").insert(new Quest(request.body)))
        .then(() => response.status(201).send())
})

router.patch('/status', (request, response) => {
    response.status(200).send();        
})

router.patch('/due-date', (request, response) => {
    response.status(200).send();            
})

module.exports = router;