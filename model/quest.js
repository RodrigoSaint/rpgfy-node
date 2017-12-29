const validateJs = require('validate.js');
const moment = require('moment');

function Quest(input, userId) 
{
    this.assign(input, userId)
}

Quest.prototype.assign = function (input, userId) 
{
    this.title = input.title;
    this.description = input.description;
    this.difficulty = input.difficulty;
    if(input.dueDate) this.dueDate = moment(input.dueDate, 'DD/MM/YYYY').toDate();
    this.userId = userId;
    this.status = 1;
    this.mob = input.mob;
}

const questValidation = {
    title: {
        presence: {allowEmpty: false },
        length: {
            minimum: 3,
            maximum: 30
        }
    },
    description: {presence: {allowEmpty: false }},
    difficulty: {
        presence: {allowEmpty: false },
        numericality: {
            onlyInteger: true,
            greaterThan: 0,
            lessThan: 6
        }
    },
    dueDate: {datetime:{
        earliest: moment().add(-1, 'days').toDate()
    }},
    mob: {presence: true}
}

Quest.prototype.validate = function validate()
{
    return validateJs.async(this, questValidation)    
}

module.exports = Quest;
