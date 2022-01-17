const bcrypt = require("bcryptjs");
const validator = require("../../../pkg/users/validate");
const userModel = require("../../../pkg/users");
const jwt = require("jsonwebtoken");
const config = require("../../../pkg/config");

const createAccount = async (req, res) => {
    try {
        await validator(req.body, "CREATE");
    } catch (err) {
        console.log(err);
        let objKeys = Object.keys(err);
        for (let item of objKeys) {
            return res.status(400).send(err[item].message);
        }
    }
    try {
        let data = req.body;
        if (data.password !== data.repeat_password) {
            return res.status(400).send("Passwords must be same");
        }
        data.password = bcrypt.hashSync(data.password);
        data.image = "";
        let user = await userModel.create(data);
        return res.status(201).send(user);
    } catch (err) {
        console.log(err);
        if (err.code === 11000) {
            return res.status(400).send("Email already in use");
        }
        return res.status(500).send(err);
    }
};

const login = async (req, res) => {
    try {
        await validator(req.body, "LOGIN");
    } catch (err) {
        console.log(err);
        if (err.password) {
            return res.status(400).send(err.password.message);
        }
        if (err.email) {
            return res.status(400).send(err.email.message);
        }
    }
    try {
        let user = await userModel.getByEmail(req.body.email);
        if (!user) {
            return res.status(400).send("Incorrect Email address");
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(400).send("Wrong password");
        }
        let token = jwt.sign(
            {
                uid: user._id,
                email: user.email,
                exp: parseInt((new Date().getTime() + 24 * 60 * 60 * 1000) / 1000),
            },
            config.get("security").secret
        );
        return res.status(200).send(token);
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

const getUser = async (req, res) => {
    try {
        let user = await userModel.getByEmail(req.user.email);
        return res.status(200).send(user);
    } catch (err) {
        return res.status(500).send(err);
    }
};

const updateProfile = async (req, res) => {
    try {
        await validator(req.body.profileData, "UPDATE");
    } catch (err) {
        console.log(err);
        let objKeys = Object.keys(err);
        for (let item of objKeys) {
            return res.status(400).send(err[item].message);
        }
    }
    try {
        let data = req.body.profileData;
        if (data.password && data.password !== data.repeat_password) {
            return res.status(400).send("Passwords must be same");
        }
        if (data.password && data.password === data.repeat_password) {
            data.password = bcrypt.hashSync(data.password);
        }
        await userModel.update(req.user.uid, data);
        return res.status(200).send("Updated");
    } catch (err) {
        return res.status(500).send(err);
    }
};

module.exports = {
    createAccount,
    login,
    getUser,
    updateProfile,
};
