const validate = require('validate.js');
const moment = require('moment');
validate.extend(validate.validators.datetime, 
{
    // The value is guaranteed not to be null or undefined but otherwise it
    // could be anything.
    parse: function(value, options) {
        return moment.utc(value).toDate();
    },
    // Input is a unix timestamp
    format: function(value, options) {
        var format = options.dateOnly ? 'DD/MM/YYYY': 'DD/MM/YYYY hh:mm:ss';
        return moment.utc(value).format(format);
    }
});