var mongodb = require('mongodb').MongoClient,
    config = require('./config');

// create a common variable to reuse in other files
let _db;

// export connection and db call methods
module.exports = {
    connection : callback => {
        // Connect to Mongo server -> DB resales
        mongodb.connect(`${config.db.url}`, { useNewUrlParser : true }, (err, con) => {
            if(err){
                // if any error occurs
                console.log("DB Connection failed",err);
            } else {
                // if connection is done
                _db = con.db('resales');
                console.log("DB Connection Sucessed.");
                callback();
            }
        });
    },
    get : () => {
        // retrive the reusable variable to manipulate in other files
        console.log('get exported connection');
        return _db;
    }
};