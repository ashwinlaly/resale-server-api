var loginSucess = {
    message : 'Login Sucess',
    status : 200
};

var loginFailed = {
    message : 'Login Failed',
    status : 400
};

var userallReadyExists = {
    message : 'User already Exists.',
    status : 400
};

var accountCreated = {
    message : 'Account Created Successfully,',
    status : 200
}

var userData = {
    message : "User Data",
    status : 200
};

var noAccountFound = {
    message : "No Account Found.",
    status : 404
};

var accountDeleted = {
    message : "Account Deleted Successfully",
    status : 200
};

module.exports = {
    loginSucess,
    loginFailed,
    userallReadyExists,
    accountCreated,
    userData,
    noAccountFound,
    accountDeleted
};