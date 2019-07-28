var moment = require('moment');

generate = ({_id, email}) => {
    console.log("Generate payload",_id);
    // var iat = moment().add(1,'d').unix();
    var type = 'u';
    payload = {
        _id, 
        email,
        type
    };
    console.log("Generated payload",payload);
    return payload;
}

exports.generate = generate;