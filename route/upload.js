var express = require('express'),
    multer = require('multer'),
    db = require('../db'),
    uuid = require('node-uuid'),
    jwt = require('jsonwebtoken'),
    config = require('../config'),
    mongo = require('mongodb'),
    fileRoute = express.Router();

var storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, './uploads');
    },
    filename : (req, file, cb) => {
        var type = file.mimetype.split('/')[1].trim();
        var Ufile = file.fieldname + uuid.v4()+'.'+type;
        req.uploadedFile = Ufile;
        cb(null, Ufile);
    }
});

var upload = multer({storage : storage});

fileRoute.post("/api/userimage", upload.single('image') ,(req,res) => {
    var token = req.headers['token'];
    jwt.verify(token, config.jwt.key, (err, decode) => {
        var id = new mongo.ObjectID(decode._id);
        db.get().collection('users').update({_id : id}, {'$set':{image : req.uploadedFile}}).then(data => {
            console.log(id);
            res.send({
                hi: 1
            });
        });
    })
});

module.exports = fileRoute;