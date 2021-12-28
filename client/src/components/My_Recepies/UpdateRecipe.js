import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import recipe_image from "../../images/recipe-image.jpg";
import back_button from "../../images/icon_back_white.svg";
import { Recipe } from './Recipe';

export const UpdateRecipe = () => {
    let token = localStorage.getItem('jwt');
    let history = useHistory();
    const backToMyRecipes = () => {
        history.push("/my-recepies");
    };
    const [recipeData, setRecipeData] = useState({
        recipe_title: "",
        category: "",
        preparation_time: "",
        people: "",
        short_description: "",
        recipe: "",
        image: ""
    });
    let url = window.location.pathname;
    let id = url.substring(url.lastIndexOf('/') + 1);
    console.log(id);
    const getRecipeById = async () => {
        try {
            let res = await axios({
                method: 'GET',
                url: `/api/v1/recipes/${id}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
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
    const createRecipe = (e) => {
        setRecipeData({
            ...recipeData,
            [e.target.name]: e.target.value,
        });
    };
    const recipeImage = async (event) => {
        let image = event.target.files[0];
        console.log(image);
        const dataf = new FormData();
        dataf.append('file', image);
        console.log(dataf);
        try {
            const res = await axios({
                method: 'POST',
                url: `/api/v1/storage/recipes`,
                data: dataf,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log(res);
            console.log(res.data);
            let p = res.data.filename;
            setRecipeData({ ...recipeData, image: p });
        } catch (err) {
            console.log(err.response);
        }
    };
    const RecipeBtn = async (e) => {
        e.preventDefault();
        try {
            let res = await axios({
                method: "PATCH",
                url: `/api/v1/recipes/${id}`,
                data: JSON.stringify({ recipeData }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res);
            history.push("/my-recepies");
        } catch (err) {
            console.log(err.response.data);
        }
    };
    useEffect(() => {
        getRecipeById();
    }, [])
    return (
        <div>
            <h1>Hello</h1>
            <Recipe
                recipeData={recipeData}
                back_button={back_button}
                backToMyRecipes={backToMyRecipes}
                recipe_image={recipe_image}
                createRecipe={createRecipe}
                recipeImage={recipeImage}
                RecipeBtn={RecipeBtn}
            />
        </div>
    )
}