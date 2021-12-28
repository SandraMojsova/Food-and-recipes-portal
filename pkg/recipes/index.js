const mongoose = require('mongoose');

const Recipe = mongoose.model(
    'recipes',
    {
        recipe_title: String,
        category: String,
        preparation_time: Number,
        people: Number,
        short_description: String,
        recipe: String,
        user_id: String,
        _created: Date,
        image: String
    },
    'recipes'
);

const create = async (data) => {
    let recipe = new Recipe(data);
    return await recipe.save();
};
const getAllByUser = async (uid) => {
    return await Recipe.find({ user_id: uid });
};

const removeRecipe = async (id, uid) => {
    return await Recipe.deleteOne({ _id: id, user_id: uid });
};

const update = async (id, uid, data) => {
    return await Recipe.updateOne({ _id: id, user_id: uid }, data);

}
const getOne = async (id) => {
    return await Recipe.findById(id);
};


module.exports = {
    create,
    getAllByUser,
    removeRecipe,
    update,
    getOne
}