module.exports = function () {
    return function(req,res,next){
        token = 'as1';
        if(token == 'as') {
            next();
        } else{
            res.send({
                message : 'bye'
            });
        }
    }
}