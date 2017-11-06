const express = require('express');
const router = express.Router();
const userRepository = require('../repository/user');
const questRepository = require('../repository/quest');

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
    userRepository.findById(response.locals.userId)
        .then(setUserLevel)
        .then(user => response.status(200).send(user));
})
let setUserLevel = user => 
    questRepository.getUserQuestExp(user._id.toString())
    .then(summary => {
        user.experience = summary.experience || 0;
        user.level = Math.ceil(user.experience / 10);
        return user;
    })

module.exports = router;