const mongoose = require('mongoose');

const Recipe = mongoose.model(
    'recipes',
    {
        recipe_title: String,
        category: String,
        preparation_time: String,
        no_people: String,
        short_description :String,
        recipe : String,
        user_id: String
    },
    'recipes'
);