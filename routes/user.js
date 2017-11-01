const express = require('express');
const router = express.Router();


router.post('/', (request, response) => {
    response.status(201).send()
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