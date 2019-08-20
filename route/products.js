var express = require('express'),
    db = require('../db'),
    config = require('../config'),
    jwt = require('jsonwebtoken'),
    uuid = require('node-uuid'),
    mongo = require('mongodb'),
    jstatus = require('../Jsonstatus'),
    productRoute = express.Router();

var route = ()  => {

    productRoute.route('/api/products')
        .get((req,res) => {
            console.log('Get All Products');
            db.get().collection('products').find({}).sort({created_at : -1 }).toArray().then((data) => {
                if(data.length < 0){
                    res.status(200).send(jstatus.NoproductsFound);
                } else {
                    res.status(200).send({
                        data, 
                        message : 'All products Listed',
                        status : 200
                    });
                }
            });
        });

    productRoute.route('/api/product')
        .get((req,res) => {
            console.log('Get All users products');
            var token = req.headers['token'];
            var productId = req.body.productId;
            jwt.verify(token, config.jwt.key, (err, decode) => {
                if(err) {
                    res.status(200).send(jstatus.InvalidAccess);
                } else {
                    var id = new mongo.ObjectID(decode._id);
                    console.log('export products by userId', id);
                    db.get().collection('products').find({_id : id}).toArray().then((data) => {
                        if(data.length < 0){
                            res.status(200).send(jstatus.NoproductsFound);
                        } else {
                            res.status(200).send({
                                data, 
                                message : 'Products for this user',
                                status : 200
                            });
                        }
                    });
                }
            });
        })
        .post((req,res) => {
            var token = req.headers['token'];
            jwt.verify(token, config.jwt.key, (err,decode) => {
                if(err) {
                    res.status(200).json(jstatus.InvalidAccess);
                } else {
                    console.log('Create Products by user', decode.email);
                    var userId = new mongo.ObjectID(decode._id);
                    var products = {
                        name : req.body.name,
                        price : req.body.price,
                        user_id : userId,
                        description : req.body.description,
                        status : true,
                        created_at : new Date(),
                        modifies_at : new Date(),
                        ordered : true
                    };
                    db.get().collection('products').insert(products).then((data) => {
                        if(data.insertedCount == 1){
                            res.status(200).json({
                                message : 'product created sucessfully.',
                                status : 200
                            });
                        } else {
                            res.status(200).json({
                                message : 'unable to create product',
                                status : 200
                            });
                        }
                    });
                }
            });
        })
        .put((req,res) => {

        });

        productRoute.route('/api/product/:id')
            .get((req,res) => {
                var token = req.headers['token'];
                jwt.verify(token, config.jwt.key, (err, decode) => {
                    if(err) {
                        res.status(200).json(jstatus.noAccountFound);
                    } else {
                        var id = new mongo.ObjectID(req.params.id);
                        db.get().collection('products').find({_id : id}).toArray().then((data) => {
                            if(data.length == 1){
                                res.status(200).json({
                                    data,
                                    message : 'Item detail.',
                                    status : 200
                                });
                            } else {
                                res.status(200).json(jstatus.itemNotFound);
                            }
                        });
                    }
                });
            })
            .patch((req,res) => {
                // res.send({
                //     message : req.body
                // });
                var data = req.body;
                res.send(data);
            })
            .delete((req,res) => {
                var token = req.headers['token'];
                jwt.verify(token, config.jwt.key, (err, decode) => {
                    if(err) {
                        res.status(200).json(jstatus.noAccountFound);
                    } else {
                        var id = new mongo.ObjectID(req.params.id);
                        db.get().collection('products').deleteOne({_id : id}).then((data) => {
                            if(data.deletedCount == 1){
                                res.status(200).json(jstatus.itemDeletionSucess);
                            } else {
                                res.status(200).json(jstatus.itemDeletionFailed);
                            }
                        });
                    }
                });
            })
        return productRoute;
}

module.exports = route;