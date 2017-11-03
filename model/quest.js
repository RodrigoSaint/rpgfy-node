const validateJs = require('validate.js');
const moment = require('moment');

function Quest(input) 
{
    this.assign(input)
}

Quest.prototype.assign = function (input) 
{
    this.title = input.title;
    this.description = input.description;
    this.difficulty = input.difficulty;
    this.dueDate = moment(input.dueDate, 'DD/MM/YYYY');
}

Quest.prototype.validation = {
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
    }}
}

Quest.prototype.validate = function validate()
{
    return validateJs.async(this, this.validation)    
}

module.exports = Quest;
