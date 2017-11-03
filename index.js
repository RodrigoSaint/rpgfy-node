const express = require('express');
const bodyParser = require('body-parser');

require('./config/date-config');

const application = express();

const userRoute = require('./routes/user');
const loginRoute = require('./routes/login');
const questRoute = require('./routes/quest');
const questReportRoute = require('./routes/quest-report');

application.use(bodyParser.json());

application.use('/user', userRoute);
application.use('/login', loginRoute);
application.use('/quest', questRoute);
application.use('/quest-report', questReportRoute);

application.listen(3000, () => {
    console.log('listening 3000')
})