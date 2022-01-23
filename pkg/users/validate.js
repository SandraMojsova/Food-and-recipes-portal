const { Validator } = require('node-input-validator');

const AccountCreate = {
    email: 'required|email',
    password: 'required|minLength:8',
    first_name: 'required|minLength:3',
    last_name: 'required|minLength:4',
    birthday: 'required',
    repeat_password: 'required',
};

const AccountLogin = {
    email: 'required|email',
    password: 'required|minLength:8'
};

const AccountUpdate = {
    email: 'email',
    password: 'minLength:8',
    first_name: 'required|minLength:3',
    last_name: 'required|minLength:4',
    birthday: 'required',
    repeat_password: 'minLength:8',
};

const validate = async (data, schema) => {
    let sch;
    switch (schema) {
        case 'CREATE':
            sch = AccountCreate;
            break;
        case 'LOGIN':
            sch = AccountLogin;
            break;
        case 'UPDATE':
            sch = AccountUpdate;
            break;

    }
    let v = new Validator(data, sch);
    let e = await v.check();
    if (!e) {
        throw v.errors
    }
};

module.exports = validate;