const mongoose = require('mongoose');

const Recipe = mongoose.model(
    'recipes',
    {
        recipe_title: String,
        category: String,
        preparation_time: Number,
        people: Number,
        short_description :String,
        recipe : String,
        user_id: String,
        _created : Date,
        image : String
    },
    'recipes'
);

const create = async (data) => {
    let recipe = new Recipe(data);
    return await recipe.save();
};
const getAllByUser = async(uid)=> {
    return await Recipe.find({ user_id: uid });
}
module.exports = {
    create,
    getAllByUser
}