const express = require('express');
const router = express.Router();
const userRepository = require('../repository/user');

const User = require('../model/user')
const hashPassword = require('../model/password-hash');

router.post('/', (request, response, next) => 
{
    let user = new User(request.body);
    user.validate()
        .then(() => next())
        .catch(validationError => response.status(400).send(validationError))
})

router.post('/', (request, response, next) => 
{
    userRepository.findByNameOrEmail(request.body.name, request.body.email)
        .then(user => 
        {
            if(!user) return next();
            if(user.name == request.body.name) 
                return response.status(400).send({name: 'Repeated name'})
            return response.status(400).send({email: 'Repeated email'})
        })
        .catch(() => response.status(500).send());
        
})

router.post('/', (request, response) => 
{
    let user = new User(request.body);
    hashPassword.hashPassword(user.password)
        .then(hash => user.password = hash)
        .then(userRepository.getCollection)
        .then(userCollection => userCollection.insert(user))
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