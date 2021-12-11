const { Validator } = require('node-input-validator');

const AccountCreate = {
    email: 'required|email',
    password: 'required',
    first_name: 'required|minLength:3',
    last_name: 'required',
    birthday: 'required|dateFormat:MM-DD-YYYY',
    repeatPassword:'required'
};

const AccountLogin = {
    email: 'required|email',
    password: 'required'
};

const AccountUpdate= {
    email: '',
    password: '',
    first_name: 'minLength:3',
    last_name: '',
    birthday: '',
    repeatPassword:''
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