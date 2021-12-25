const bcrypt = require('bcryptjs');
const validator = require('../../../pkg/users/validate');
const user = require('../../../pkg/users');
const jwt = require('jsonwebtoken');
const config = require('../../../pkg/config');

const createAccount = async (req, res) => {
    try {
        await validator(req.body, 'CREATE');
    } catch (err) {
        console.log(err);
        let objKeys = Object.keys(err);
        for (let item of objKeys) {
            console.log(err[item].message)
            return res.status(400).send(err[item].message);
        }

    }
    try {
        let data = req.body;
        if (data.password !== data.repeat_password) {
            return res.status(400).send('Passwords must be same');
        }
        data.password = bcrypt.hashSync(data.password);
        data.image = "";
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
            exp: parseInt((new Date().getTime() + 24 * 60 * 60 * 1000) / 1000)
        }, config.get('security').secret);
        return res.status(200).send(token);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal server error');
    }
};

const getUser = async (req, res) => {
    try {
        let u = await user.getByEmail(req.user.email);
        return res.status(200).send(u);
    } catch (err) {
        return res.status(500).send(err);
    }
}

const updateProfile = async (req, res) => {
    try {
        await validator(req.body.profileData, 'UPDATE');
    } catch (err) {
        console.log(err);
        let objKeys = Object.keys(err);
        for (let item of objKeys) {
            console.log(err[item].message)
            return res.status(400).send(err[item].message);
        }
    }
    try {
        // console.log(req.user.uid);
        // console.log(req.body);
        let data=req.body.profileData;
        if (data.password && data.password !== data.repeat_password) {
            return res.status(400).send('Passwords must be same');
        }
        if (data.password && data.password === data.repeat_password) {
            data.password = bcrypt.hashSync(data.password);
        }
        let s = await user.update(req.user.uid, data);
        console.log(s);
        return res.status(200).send('ok');
    } catch (err) {
        console.log(err)
        console.log(err.message);
        return res.status(500).send(err);
    }
};

module.exports = {
    createAccount,
    login,
    getUser,
    updateProfile
}

