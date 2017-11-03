const express = require('express');
const router = express.Router();
const getConnection = require('../config/mongo-connection');

const User = require('../model/user')
const hashPassword = require('../model/password-hash');

router.post('/', (request, response, next) => 
{
    let user = new User(request.body);
    user.validate()
        .then(() => next())
        .catch(validationError => response.status(400).send(validationError))
})

router.post('/', (request, response) => 
{
    let user = new User(request.body);
    hashPassword(user.password)
        .then(hash => user.password = hash)
        .then(getConnection)
        .then(connection => connection.collection("user").insert(user))
        .then(() => response.status(201).send())
        .catch(() => response.status(500).send());
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