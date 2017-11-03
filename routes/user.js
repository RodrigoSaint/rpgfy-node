const express = require('express');
const router = express.Router();
const User = require('../model/user')
const getConnection = require('../config/mongo-connection');

router.post('/', (request, response, next) => 
{
    let user = new User(request.body);
    user.validate()
        .then(() => next())
        .catch(validationError => response.status(400).send(validationError))
})

router.post('/', (request, response) => {
    getConnection()
        .then(connection => connection.collection("user").insert(new User(request.body)))
        .then(() => response.status(201).send())
})

router.get('/', (request, response, next) => {
    response.send({
        "id": "123",
        "level": 1,
        "experience": 0,
        "name": "rodrigosaint",
        "email": "rodrigo.saint01@live.com",
        "playerClass": ""
      })
      next()
})


module.exports = router;