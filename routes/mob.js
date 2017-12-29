const express = require('express');
const router = express.Router();

const mobCollection = require('../data/mob')
router.get('/', (request, response) => 
{
    response.status(200).send(mobCollection)
})

module.exports = router;
