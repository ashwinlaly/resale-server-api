// import all Packages
var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    bodyParser = require('body-parser'),
    io = require('socket.io')(http),
    db = require('./db');

// Import all routes
loginRoute = require('./route/login')();
SignupRoute = require('./route/signin')();
profileRoute = require('./route/profile')();
fileRoute = require('./route/upload');
productRoute = require('./route/products')();

// Create a Socket variable to reuse later Socket is inlined here
let _socket;

// Make Server to process JSON and other data passed
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

// make App to communicate Cross-site 
app.use(function(req,res,next){
    // res.setHeader('Content-Type','application/json');
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Methods","GET, PUT, POST, DELETE, PATCH");
    res.setHeader("Access-Cross-Allow-Credentials",true);
    next();
});

// Console Log all request to the server
app.use(function (req,res,next){
    console.log(" Action -> " + req.connection.remoteAddress +"  " + req.method + " : " + req.url);
    next();
});

// make the routes available to the serve
app.use(loginRoute);
app.use(SignupRoute);
app.use(profileRoute);
app.use(fileRoute);
app.use(productRoute);

// if incorrect access is found
app.all('*',function(req,res){
    console.log("~ Action -> " + req.connection.remoteAddress +"  " + req.method + " : " + req.url);
    res.status(404).json({
        message: 'Invalid '+ req.method +' access',
        status : 404
    });
});

// Check new connection to the socket
io.on('connection',(socket)=>{
    _socket = socket;
    // Socket Functions are available here
    _socket.on('test',(data)=>{
        console.log("test socket receive",data);
        _socket.emit('received',{'data' : data});
    });
    console.log('New connection ', _socket.id);
});

// Start DB Connection and the to server if and only if the DB connection sucessfull
db.connection(er => {
    if(er){
        console.log('connection error');
    } else {

        // Create a stream that watchs for changes
        var userStream = db.get().collection('users').watch();
        userStream.on('change', (next) => {
            _socket.emit('send',{'data' : next});
            console.log(next);
        });

        // creating a server 
        http.listen(1234,function(){
            console.log('server listing to the port http://localhost:1234');
        });
    }
});