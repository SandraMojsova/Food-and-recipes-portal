const mongoose = require('mongoose');

const Recipe = mongoose.model(
    'recipes',
    {
        recipe_title: String,
        category: {
            type: String,
            enum: ['breakfast', 'brunch', 'lunch', 'dinner']
        },
        preparation_time: Number,
        people: Number,
        short_description: String,
        recipe: String,
        user_id: String,
        _created: String,
        image: String,
        likes: [''],
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

const getAll = async () => {
    return await Recipe.find({});
};

const getByCategory = async (category) => {
    return await Recipe.find({ category: category })
};

const like = async (postId, userId) => {
    return await Recipe.findByIdAndUpdate({ _id: postId }, {
        $push: { likes: userId }
    }, { new: true })
};

const dislike = async (postId, userId) => {
    return await Recipe.findByIdAndUpdate({ _id: postId }, {
        $pull: { likes: userId }
    }, { new: true })
};


module.exports = {
    create,
    getAllByUser,
    removeRecipe,
    update,
    getOne,
    getAll,
    getByCategory,
    like,
    dislike
};