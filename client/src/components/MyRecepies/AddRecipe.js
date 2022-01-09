import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { uploadImage, addRecipe } from '../../api/recipes';
import back_button from "../../images/icon_back_white.svg";
import recipe_image from "../../images/recipe-image.jpg";
import { Recipe } from './Recipe';
import "./index.css";

export const AddRecipe = () => {

    let token = localStorage.getItem("jwt");
    let history = useHistory();

    const [recipeData, setRecipeData] = useState({
        recipe_title: "",
        category: "",
        preparation_time: "",
        people: "",
        short_description: "",
        recipe: "",
        image: "",
    });
    const [err, setError] = useState(null);

    const backToMyRecipes = () => {
        history.push("/my-recepies");
    };

    const createRecipe = (e) => {
        setRecipeData({
            ...recipeData,
            [e.target.name]: e.target.value,
        });
    };

    const recipeImage = async (event) => {
        let image = event.target.files[0];
        const formData = new FormData();
        formData.append('file', image);
        try {
            const res = await uploadImage(token, formData);
            setRecipeData({ ...recipeData, image: res.data.filename });
        } catch (err) {
            console.log(err.response);
        }
    };

    const saveRecipeBtn = async (e) => {
        e.preventDefault();
        try {
            await addRecipe(recipeData, token);
            history.push("/my-recepies");
        } catch (err) {
            setError(err.response.data);
        }
    };

    return (
        <div id="add-recipe">
            <Recipe
                recipeData={recipeData}
                back_button={back_button}
                backToMyRecipes={backToMyRecipes}
                recipeImage={recipeImage}
                createRecipe={createRecipe}
                saveRecipeBtn={saveRecipeBtn}
                recipe_image={recipe_image}
            />
            {err && <h3>{err}</h3>}
        </div>
    );
};
