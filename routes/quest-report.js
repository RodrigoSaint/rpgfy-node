const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
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

module.exports = router;