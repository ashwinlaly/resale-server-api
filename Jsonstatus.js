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

var InvalidAccess = {
    message : 'Invalid URL Access',
    status : 400
}

var itemDeletionFailed = {
    message : 'Unable to delete this item',
    status : 400
}

var itemDeletionSucess = {
    message : 'Item deleted sucessfully',
    status : 200
}

var itemNotFound = {
    message : 'Item Not Found',
    status : 200
}

module.exports = {
    loginSucess,
    loginFailed,
    userallReadyExists,
    accountCreated,
    userData,
    noAccountFound,
    accountDeleted,
    InvalidAccess,
    itemDeletionFailed,
    itemDeletionSucess,
    itemNotFound
};