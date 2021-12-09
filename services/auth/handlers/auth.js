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
        return res.status(400).send(err);
    }
    try {
        let data = req.body;
        data.password = bcrypt.hashSync(data.password);
        let u = await user.create(data);
        return res.status(201).send(u);
    } catch (err) {
        console.log(err);
        if (err.code === 11000) {
            return res.status(400).send(err);
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

const getAll = async(req,res)=> {
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
        return res.status(400).send('Bad request');
    }
    try {
        await user.update(req.user.uid,req.body);
        res.status(204).send();
    } catch (err) {
        return res.status(500).send(err);
    }
};
module.exports = {
    createAccount,
    login,
    getAll,
    updateProfile
}

