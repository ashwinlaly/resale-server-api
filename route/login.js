// Create a Route to Login Process
var express = require('express'),
    loginRoute = express.Router(),
    status = require('../Jsonstatus'),
    jwt = require('jsonwebtoken'),
    config = require('../config'),
    generateToken = require('../middleware/generateToken'),
    db = require('../db');

var route = () => {
    // post data to login into the site
    loginRoute.route('/login')
        .post((req,res) => {
            var Qwhere = {
                email : req.body.email,
                password : req.body.password
            };
            var where = [
                {'$match' : Qwhere},
                {'$project' : {'_id' : 1, 'email' : 1 }}
            ];
            // res.send({te : moment().add(1,'d').unix()});
            db.get().collection('users').aggregate(where).toArray().then((data) => {
                if(data.length == 1){
                    var payload = generateToken.generate(data[0]);
                    // console.log("key", config.jwt.key);
                    jwt.sign(payload,config.jwt.key, { expiresIn : '10' }, (err, token) => {
                        if(err){
                            res.status(404).json(status.loginFailed);
                        } else {
                            var loginSucess = {
                                ...status.loginSucess,
                                token
                            };
                            res.status(200).json(loginSucess);
                        }
                    });
                    // res.status(200).json(payload);
                } else {
                    res.status(404).json(status.loginFailed);
                }
            });
        });


    loginRoute.route('/test')
        .get((req,res) => {
            var Qwhere = {
                email : 'ashwinlaly@gmail.com'
            };
            // console.warn(req.headers['token']);
            jwt.verify(req.headers['token'], config.jwt.key, (err, result) => {
                if(err){
                    res.send({err});
                } else {
                    res.send({result});
                }
            })

            // db.get().collection('users').find({}).toArray().then((data) => {
            //     res.status(200).json(data);
            // });
            // db.get().collection('users').find(Qwhere).count().then((data) => {
            //     var loginSucess = {
            //         ...status.loginSucess,
            //         token : '123'
            //     };
            //     res.status(200).json(loginSucess);
            // });
        });


    return loginRoute;
};

module.exports = route;