const chai = require('chai');
const moment = require('moment')
require('../../config/date-config')
const Quest = require('../../model/Quest');


chai.should()

describe('Quest', () => 
{
    describe('validation', () => 
    {
        it('catch invalid Quest', (done) =>
        {
            let quest = new Quest({});
            quest.validate()
                .then(() => done('the Quest should be invalid'))
                .catch(validationError => 
                {
                    validationError.should.haveOwnProperty('title').with.lengthOf(1);
                    validationError.should.haveOwnProperty('description').with.lengthOf(1);
                    validationError.should.haveOwnProperty('difficulty').with.lengthOf(1);
                    validationError.should.haveOwnProperty('dueDate').with.lengthOf(1);
                    done()
                })
        })

        it('validate valid Quest', (done) =>
        {
            let quest = new Quest({
                title: "A quest",
                description: "My first quest. I don't know what write",
                difficulty: 2,
                dueDate: moment().add(1, "days").format('DD/MM/YYYY')
            });
            quest.validate()
                .then(() => done())
                .catch(done)
        })

    })

    it('assign all fields needed', () =>
    {
        var rawQuestData = {
            title: "A quest",
            description: "My first quest. I don't know what write",
            difficulty: 2,
            dueDate: '01/11/2017',
            extraProperty: 'a property'
        }
        let quest = new Quest(rawQuestData);
        quest.should.haveOwnProperty("title")
        quest.should.haveOwnProperty("description")
        quest.should.haveOwnProperty("difficulty")
        quest.should.haveOwnProperty("dueDate")
        quest.should.not.haveOwnProperty("extraProperty")
    })

})