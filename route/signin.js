var express = require('express'),
    signupRoute = express.Router(),
    db = require('../db'),
    status = require('../Jsonstatus');

var route = () => {

    signupRoute.route('/signup')
        .post((req,res) => {
            // Check User exists
            var QExists = {
                email : req.body.email
            }
            db.get().collection('users').countDocuments(QExists).then((data) => {
                if(data == 1){
                    res.status(202).json(status.userallReadyExists);
                } else {
                    // data to insert
                    var Idata = {
                        name : req.body.name,
                        email : req.body.email,
                        password : req.body.password,
                        mobile : req.body.mobile,
                        status : true,
                        created_at : new Date(),
                        modified_at : new Date()
                    }
                    db.get().collection('users').insertOne(Idata).then((data) => {
                        res.status(200).json(status.accountCreated);
                    });
                }
            });
        });

    return signupRoute;

}

module.exports = route;


// jwt.verify(token, config.jwt.key, (err, decode) => {
//     if(err) {
//         res.send({...err, status : 400})
//     } else {
        
//     }
// });