module.exports = function (){
    return function(req,res,next) {
        console.log("URL to " + req.url + "Method type" + req.method);
        next();
    }
}