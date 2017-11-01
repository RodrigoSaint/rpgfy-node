const express = require('express');
const router = express.Router();

router.post('/', (request, response) => {
    response.status(200).send('rdkaljdsadlkasjdkla')    
})

module.exports = router;