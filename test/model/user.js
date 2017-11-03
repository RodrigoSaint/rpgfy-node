const chai = require('chai');
const User = require('../../model/user');

chai.should()

describe('user', () => 
{
    describe('validation', () => 
    {
        it('catch invalid user', (done) =>
        {
            let user = new User({});
            user.validate()
                .then(() => done('the user should be invalid'))
                .catch(validationError => 
                {
                    validationError.should.haveOwnProperty('name').with.lengthOf(1);
                    validationError.should.haveOwnProperty('email').with.lengthOf(1);
                    validationError.should.haveOwnProperty('password').with.lengthOf(1);
                    validationError.should.haveOwnProperty('playerClass').with.lengthOf(1);
                    done()
                })
        })

        it('validate valid user', (done) =>
        {
            let user = new User({
                name: 'lord',
                email: 'lord@lord.com',
                password: 'dashjdashdka',
                playerClass: 1
            });
            user.validate()
                .then(() => done())
                .catch(done)
        })

    })

    it('assign all fields needed', () =>
    {
        var rawUserData = {
            name: 'lord',
            email: 'lord@lord.com',
            password: 'dashjdashdka',
            playerClass: 1,
            extraProperty: 'a property'
        }
        let user = new User(rawUserData);
        user.should.haveOwnProperty("name")
        user.should.haveOwnProperty("email")
        user.should.haveOwnProperty("password")
        user.should.haveOwnProperty("playerClass")
        user.should.not.haveOwnProperty("extraProperty")
    })

})