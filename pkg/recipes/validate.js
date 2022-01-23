const { Validator } = require('node-input-validator');

const RecipeCreate = {
    recipe_title: 'required|minLength:4',
    category: 'required',
    preparation_time: 'required|between:0,1440',
    people: 'required|between:0,100',
    short_description: 'required|minLength:20',
    recipe: 'required|maxLength:1000',
    image: 'required'
};

const RecipeUpdate = {
    recipe_title: 'minLength:4',
    preparation_time: 'between:0,1440',
    people: 'between:0,100',
    short_description: 'minLength:20',
    recipe: 'maxLength:1000'
}

const validate = async (data, schema) => {
    let sch;
    switch (schema) {
        case 'CREATE':
            sch = RecipeCreate;
            break;
        case 'UPDATE':
            sch = RecipeUpdate;
            break;
    }
    let v = new Validator(data, sch);
    let e = await v.check();
    if (!e) {
        throw v.errors
    }
};

module.exports = validate;