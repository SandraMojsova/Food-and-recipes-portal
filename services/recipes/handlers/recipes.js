const validator = require('../../../pkg/recipes/validate');
const recipeModel = require('../../../pkg/recipes/index');

const create = async (req,res)=> {
    try {
        await validator(req.body , "CREATE");
    } catch (err) {
        console.log(err);
        let objKeys = Object.keys(err);
        for (let item of objKeys) {
            console.log(err[item].message)
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
}
const getRecipesByUser = async(req,res)=> {
    try {
        let data = await recipeModel.getAllByUser(req.user.uid);
        return res.status(200).send(data);
    } catch (err) {
        return res.status(500).send(err);
    }
}
module.exports = {
    create,
    getRecipesByUser
}