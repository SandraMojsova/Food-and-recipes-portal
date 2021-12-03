const { Validator } = require('node-input-validator');

const AccountCreate = {
    email: 'required|email',
    password: 'required',
    first_name: 'required',
    last_name: 'required',
    birthday: 'required|dateFormat:MM-DD-YYYY'
};

const AccountLogin = {
    email: 'required|email',
    password: 'required'
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
    }
    let v = new Validator(data, sch);
    let e = await v.check();
    if (!e) {
        throw v.errors
    }
};

module.exports = validate;