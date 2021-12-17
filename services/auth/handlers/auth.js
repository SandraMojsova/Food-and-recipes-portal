const bcrypt = require('bcryptjs');
const validator = require('../../../pkg/users/validate');
const user = require('../../../pkg/users');
const jwt = require('jsonwebtoken');
const config = require('../../../pkg/config');

const createAccount = async (req, res) => {
    try {
        await validator(req.body, 'CREATE');
    } catch (err) {
        // if (err.password) {
        //     console.log(err.password.message)
        //     return res.status(400).send(err.password.message)
        // }
        // if (err.email) {
        //     console.log(err.email.message)
        //     return res.status(400).send(err.email.message)
        // }
        console.log(err);
        let objKeys = Object.keys(err);
        for (let item of objKeys) {
            console.log(err[item].message)
            return res.status(400).send(err[item].message);
        }

    }
    try {
        let data = req.body;
        if (data.password !== data.repeatPassword) {
            return res.status(400).send('Password must be same');
        }
        data.password = bcrypt.hashSync(data.password);
        let u = await user.create(data);
        return res.status(201).send(u);
    } catch (err) {
        console.log(err);
        if (err.code === 11000) {
            return res.status(400).send('Email already in use');
        }
        return res.status(500).send(err);
    }
};

const login = async (req, res) => {
    try {
        await validator(req.body, 'LOGIN');
    } catch (err) {
        console.log(err);
        if (err.password) {
            console.log(err.password.message)
            return res.status(400).send(err.password.message)
        }
        if (err.email) {
            console.log(err.email.message)
            return res.status(400).send(err.email.message)
        }
    }
    try {
        let u = await user.getByEmail(req.body.email);
        if (!u) {
            return res.status(400).send('Incorrect Email address');
        }
        if (!bcrypt.compareSync(req.body.password, u.password)) {
            return res.status(400).send('Wrong password');
        }
        let token = jwt.sign({
            uid: u._id,
            email: u.email,
            full_name: `${u.first_name} ${u.last_name}`,
        }, config.get('security').secret);
        res.status(200).send(token);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal server error');
    }
};

const getAll = async (req, res) => {
    try {
        let u = await user.getByEmail(req.user.email);
        return res.status(200).send(u);
    } catch (err) {
        return res.status(500).send(err);
    }
}

const updateProfile = async (req, res) => {
    try {
        await validator(req.body, 'UPDATE');
    } catch (err) {
        return res.status(400).send(err.message);
    }
    try {
        // let u = await user.getByEmail(req.user.email);
        // console.log(u);
        // if(u) {
        //     u.email = u.email;
        //     u.password = req.body.password ? req.body.password : u.password;
        //     u.first_name = req.body.first_name ? req.body.first_name : u.first_name;
        //     u.last_name = req.body.last_name ? req.body.last_name : u.last_name;
        //     u.birthday = req.body.birthday ? req.body.birthday : u.birthday;
        //     u.repeatPassword = req.body.repeatPassword
        // }
        // console.log(u._id.valueOf());
        // console.log(u);

        // let s = await user.update(u._id.valueOf(),u);
        console.log(req.user.uid);
        console.log(req.body);
        let s = await user.update(req.user.uid, req.body.profileData);
        console.log(s);
        return res.status(200).send('ok');
    } catch (err) {
        console.log(err)
        console.log(err.message);
        return res.status(500).send(err);
    }
};

const logOut = (req, res) => {

}
module.exports = {
    createAccount,
    login,
    getAll,
    updateProfile,
    logOut
}

