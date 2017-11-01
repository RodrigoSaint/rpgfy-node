const express = require('express');

const application = express();

application.post('/user', (request, response) => {
    response.status(201).send()
})

application.post('/login', (request, response) => {
    response.status(200).send('rdkaljdsadlkasjdkla')    
})

//autorize
application.get('/user', (request, response) => {
    response.send({
        "id": "123",
        "level": 1,
        "experience": 0,
        "name": "rodrigosaint",
        "email": "rodrigo.saint01@live.com",
        "playerClass": ""
      })
})

application.get('/quest-report', (request, response) => {
    response.send([
        {
          "range": {
            "start": "1/1/2017",
            "end": "1/2/2017"
          },
          "completed": 10,
          "failed": 3
        },
        {
          "range": {
            "start": "1/2/2017",
            "end": "1/3/2017"
          },
          "completed": 5,
          "failed": 6
        }
      ])
})

application.get('/quest', (request, response) => {
    request.send([
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

application.post('/quest', (request, response) => {
    response.status(201).send();    
})

application.patch('/quest/status', (request, response) => {
    response.status(200).send();        
})

application.patch('/quest/due-date', (request, response) => {
    response.status(200).send();            
})
