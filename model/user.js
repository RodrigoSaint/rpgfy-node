const validateJs = require('validate.js');

function User(input) 
{
    this.assign(input)
}

User.prototype.assign = function (input) 
{
    this.name = input.name;
    this.email = input.email;
    this.password = input.password;
    this.playerClass = input.playerClass;
}

const userValidation = {
    name: {
        presence: {allowEmpty :false},
        length: {maximum: 20, minimum: 3}
    },
    email: {
        presence: {allowEmpty :false},
        email: true
    },
    password: {
        presence: {allowEmpty :false}                    
    },
    playerClass: {
        presence: {allowEmpty :false}                    
    }
};

User.prototype.validate = function validate()
{
    return validateJs.async(this, userValidation)
}

module.exports = User;
