import axios from "axios";
import { routes } from '../const';

export const recipesByUser = (token) => {
    return axios({
        method: "GET",
        url: `${routes.recipes}/me`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const deleteRecipe = (id, token) => {
    return axios({
        method: "DELETE",
        url: `${routes.recipes}/${id}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const uploadImage = (token, formData) => {
    return axios({
        method: "POST",
        url: `${routes.storage}/recipes`,
        data: formData,
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        },
    });
};

export const addRecipe = (recipeData, token) => {
    return axios({
        method: "POST",
        url: `${routes.recipes}`,
        data: JSON.stringify(recipeData),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
};

export const recipeById = (id, token) => {
    return axios({
        method: "GET",
        url: `${routes.recipes}/${id}`,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
};

export const updateRecipe = (id, recipeData, token) => {
    return axios({
        method: "PATCH",
        url: `${routes.recipes}/${id}`,
        data: JSON.stringify({ recipeData }),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getAllRecipes = async () => {
    return axios({
        method: "GET",
        url: `${routes.recipes}/all`,
        headers: { "Content-Type": "application/json" },
    });
};

export const addStar = async (id, token) => {
    return axios({
        method: "PATCH",
        url: `${routes.recipes}/like/${id}`,
        data: JSON.stringify({ id }),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
};

export const recipesByCategory = async (category) => {
    return axios({
        method: 'GET',
        url: `${routes.recipes}/all/${category}`,
        headers: { 'Content-Type': 'application/json' }
    })
};
