var express = require('express'),
    profileRoute = express.Router(),
    jwt = require('jsonwebtoken'),
    config = require('../config'),
    db = require('../db'),
    mongo = require('mongodb'),
    status = require('../Jsonstatus'),

    multer = require('multer'),
    upload = multer({dest : './uploads/'});

var route = () => {

    profileRoute.route('/profile')
        .get((req,res) => {
            var token = req.headers['token'];
            jwt.verify(token, config.jwt.key, (err,decode) => {
                if(err){
                    res.status(400).json({...err,status : 400});
                } else {
                    var id = new mongo.ObjectID(decode._id);
                    // res.send(decode);
                    db.get().collection('users').find({_id : id}).toArray().then((data) => {
                        if(data.length == 1){
                            var result = {
                                ...data[0],status : 200
                            };
                            res.send(result);
                        }
                    });
                }
            });
        })
        // .post((req,res) => {
        //     var token = req.headers['token'];
        //     jwt.verify(token, config.jwt.key, (err,decode) => {
        //         if(err){
        //             res.status(400).json({...err,status : 400});
        //         } else {
        //             res.send(status.userData);
        //         }
        //     });
        // })
        .delete((req,res) => {
            var token = req.headers['token'];
            jwt.verify(token, config.jwt.key, (err,decode) => {
                if(err){
                    res.status(400).json({...err,status : 400});
                } else {
                    var id = new mongo.ObjectID(decode._id);
                    db.get().collection('users').find({_id : id}).toArray().then(data => {
                        if(data.length == 1) {
                            db.get().collection('users').deleteOne({_id : id}).then(data => {
                                res.send(status.accountDeleted);    
                            })
                        } else {
                            res.send(status.noAccountFound);
                        }
                    });
                }
            });
        })
        .patch((req,res) => {
            var token = req.headers['token'];
            jwt.verify(token, config.jwt.key, (err,decode) => {
                if(err){
                    res.status(400).json({...err,status : 400});
                } else {
                    
                    res.send(status.userData);
                }
            });
        })

    return profileRoute;

}

module.exports = route;