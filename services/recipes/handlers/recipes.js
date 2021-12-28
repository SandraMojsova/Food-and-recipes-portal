const validator = require('../../../pkg/recipes/validate');
const recipeModel = require('../../../pkg/recipes');

const createRecipe = async (req, res) => {
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
        let data = {
            ...req.body,
            user_id: req.user.uid
        };
        data._created = new Date();
        let recipe = await recipeModel.create(data);
        res.status(201).send(recipe);
    } catch (err) {
        return res.status(500).send(err);
    }
};

const getRecipesByUser = async (req, res) => {
    try {
        let data = await recipeModel.getAllByUser(req.user.uid);
        return res.status(200).send(data);
    } catch (err) {
        return res.status(500).send(err);
    }
};

const deleteRecipe = async (req, res) => {
    try {
        if (await recipeModel.removeRecipe(req.params.id, req.user.uid)) {
            return res.status(204).send();
        }
        return res.status(404).send('Not found');
    } catch (err) {
        return res.status(500).send(err);
    }
};

const getRecipeById = async (req, res) => {
    try {
        let data = await recipeModel.getOne(req.params.id);
        return res.status(200).send(data);
    } catch (err) {
        return res.status(500).send(err);
    }
};

const updateRecipe = async (req, res) => {
    try {
        await validator(req.body.recipeData, 'UPDATE');
    } catch (err) {
        console.log(err);
        return res.status(400).send(err);
    }
    try {
        await recipeModel.update(req.params.id, req.user.uid, req.body.recipeData);
        res.status(204).send();
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

module.exports = {
    createRecipe,
    getRecipesByUser,
    deleteRecipe,
    updateRecipe,
    getRecipeById
}