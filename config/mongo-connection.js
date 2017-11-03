const mongodb = require('mongodb');

var _connectionCache;

module.exports = function getConnection() 
{
    if(_connectionCache) return Promise.resolve(_connectionCache);
    return mongodb.MongoClient.connect("mongodb://localhost:27017/rpgfy", {native_parser: true})
        .then(connection => {
            _connectionCache = connection;
            return Promise.resolve(_connectionCache)
        })
}