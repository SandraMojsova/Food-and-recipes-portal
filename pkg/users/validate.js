const { Validator } = require('node-input-validator');

const AccountCreate = {
    email: 'required|email',
    password: 'required|minLength:8',
    first_name: 'required|minLength:3',
    last_name: 'required|minLength:4',
    birthday: 'required|dateFormat:MM-DD-YYYY',
    repeatPassword:'required'
};

const AccountLogin = {
    email: 'required|email',
    password: 'required|minLength:8'
};

const AccountUpdate= {
    password: 'minLength:8',
    first_name: 'minLength:3',
    last_name: 'minLength:4',
    birthday: 'dateFormat:MM-DD-YYYY',
    repeatPassword: 'minLength:8',
}

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