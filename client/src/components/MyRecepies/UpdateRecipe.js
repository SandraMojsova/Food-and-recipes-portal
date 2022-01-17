import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { recipeById, uploadImage, updateRecipe } from '../../api/recipes';
import back_button from '../../assets/images/icon_back_white.svg';
import recipe_image from '../../assets/images/recipe-image.jpg';
import { Recipe } from './Recipe';
import { token } from '../../const';
import "./style.css";

export const UpdateRecipe = () => {

    let history = useHistory();

    const [recipeData, setRecipeData] = useState({
        recipe_title: "",
        category: "",
        preparation_time: "",
        people: "",
        short_description: "",
        recipe: "",
        image: ""
    });
    const [err, setError] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [image, setImage] = useState('');

    let url = window.location.pathname;
    let id = url.substring(url.lastIndexOf('/') + 1);

    const backToMyRecipes = () => {
        history.push("/my-recepies");
    };

    const getRecipeById = async () => {
        try {
            let res = await recipeById(id, token);
            setRecipeData({
                recipe_title: res.data.recipe_title,
                category: res.data.category,
                preparation_time: res.data.preparation_time,
                people: res.data.people,
                short_description: res.data.short_description,
                recipe: res.data.recipe,
                image: res.data.image
            })
        } catch (err) {
            console.log(err.response.data);
        }
    }

    const recipeFieldUpdate = (e) => {
        setRecipeData({
            ...recipeData,
            [e.target.name]: e.target.value,
        });
    };

    const recipeImage = async (event) => {
        setUploadedImage(URL.createObjectURL(event.target.files[0]))
        setImage(event.target.files[0]);
    };

    const saveRecipeBtn = async (e) => {
        e.preventDefault();
        if (image) {
            const formData = new FormData();
            formData.append('file', image);
            const res = await uploadImage(token, formData);
            recipeData.image = res.data.filename;
        }
        try {
            await updateRecipe(id, recipeData, token);
            history.push("/my-recepies");
        } catch (err) {
            setError(err.response.data);
            console.log(err.response.data);
        }
    };

    useEffect(() => {
        getRecipeById();
    }, [])

    return (
        <div id="update-recipe">
            <Recipe
                recipeData={recipeData}
                back_button={back_button}
                backToMyRecipes={backToMyRecipes}
                recipe_image={recipe_image}
                recipeFieldUpdate={recipeFieldUpdate}
                recipeImage={recipeImage}
                saveRecipeBtn={saveRecipeBtn}
                uploadedImage={uploadedImage}
                err={err}
            />
        </div>
    )
}