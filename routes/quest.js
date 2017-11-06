const express = require('express');
const router = express.Router();
const Quest = require('../model/quest');
const questRepository = require('../repository/quest');

router.get('/', (request, response) => 
{
    questRepository
        .getActiveQuestCollection(response.locals.userId)
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
    let quest = new Quest(request.body, response.locals.userId);
    questRepository.getCollection()
        .then(questCollection =>questCollection.insert(quest))
        .then(() => response.status(201).send())
})

router.patch('/:id', (request, response) => 
{
    questRepository.updateQuest(request.params.id, request.body)
        .then(() => response.status(200).send())
        .catch(() => response.status(500).send())
})

module.exports = router;