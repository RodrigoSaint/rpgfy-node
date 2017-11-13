const express = require('express');
const router = express.Router();

const userRepository = require('../repository/user');
const hashPassword = require('../model/password-hash');
const Credential = require('../model/credential');

router.post('/', (request, response) => 
{
    userRepository.findByNameOrEmail(request.body.name, request.body.name)
        .then(user => 
        {
            if(!user) throw 'user not found';
            return hashPassword
                .comparePassword(request.body.password, user.password)
                .then(() => user);
        })
        .then(user => new Credential(user).getToken())
        .then(token => response.status(200).send(token))
        .catch(() => response.status(401).send())
})

module.exports = router;