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
        birthday: Date,
        image: String
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

const update = async (id, data) => {
    return await User.updateOne({ _id: id }, data);
};

const findbyId = async (id) => {
    return await User.findById(id);
};

module.exports = {
    create,
    getByEmail,
    update,
    findbyId
}