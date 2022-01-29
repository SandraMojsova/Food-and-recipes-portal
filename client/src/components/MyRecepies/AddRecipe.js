import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { uploadImage, addRecipe } from '../../api/recipes';
import back_button from '../../assets/images/icon_back_white.svg';
import recipe_image from '../../assets/images/recipe-image.jpg';
import { Recipe } from './Recipe';
import { token } from '../../const';
import "./style.css";

export const AddRecipe = () => {

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
    const [uploadedImage, setUploadedImage] = useState(null);
    const [image, setImage] = useState('');
    const [err, setError] = useState(null);

    const backToMyRecipes = () => {
        history.push("/my-recepies");
    };

    const recipeFieldUpdate = (e) => {
        setRecipeData({
            ...recipeData,
            [e.target.name]: e.target.value,
        });
    };

    const recipeImage = async (event) => {
        if(event.target.files[0].type.substring(0,5) !== "image") {
            setError("Filetype not allowed");
        }
        setUploadedImage(URL.createObjectURL(event.target.files[0]))
        setImage(event.target.files[0]);
    };

    const saveRecipeBtn = async (e) => {
        e.preventDefault();
        if (image) {
            const formData = new FormData();
            formData.append('file', image);
            const res = await uploadImage(token, formData);
            console.log(res);
            recipeData.image = res.data.filename;
        }
        try {
            await addRecipe(recipeData, token);
            history.push("/my-recepies");
        } catch (err) {
            console.log(err.response.data)
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
                uploadedImage={uploadedImage}
                recipeFieldUpdate={recipeFieldUpdate}
                saveRecipeBtn={saveRecipeBtn}
                recipe_image={recipe_image}
                err={err}
            />
        </div>
    )
};
