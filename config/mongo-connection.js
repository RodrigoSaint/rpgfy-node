const mongodb = require('mongodb');

var _connectionCache;

module.exports = function getConnection() 
{
    if(_connectionCache) return Promise.resolve(_connectionCache);
    return mongodb.MongoClient.connect(process.env.CONNECTION_STRING, {native_parser: true})
        .then(connection => {
            _connectionCache = connection;
            return Promise.resolve(_connectionCache)
        })
}