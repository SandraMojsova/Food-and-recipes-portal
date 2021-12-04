const mongoose = require('mongoose');

const User = mongoose.model(
    'users',
    {
        email: {
            type: String,
            unique: true
        },
        password: String,
        first_name: String,
        last_name: String,
        birthday: Date
    },
    'users'
);

const create = async (data) => {
    let u = new User(data);
    return await u.save();
};
const getByEmail = async (email) => {
    return await User.findOne({ email });
};
const getAll = async (email) => {
    return await User.findOne({email});
};


module.exports = {
    create,
    getByEmail,
    getAll
}