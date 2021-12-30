import axios from 'axios';

export const recipesByUser = (token) => {
    return axios({
        method: 'GET',
        url: `/api/v1/recipes/me`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
};

export const deleteRecipe = (id, token) => {
    return axios({
        method: 'DELETE',
        url: `/api/v1/recipes/${id}`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const uploadImage = (token, formData) => {
    return axios({
        method: 'POST',
        url: `/api/v1/storage/recipes`,
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        }
    })
}

export const addRecipe = (recipeData, token) => {
    return axios({
        method: "POST",
        url: `/api/v1/recipes`,
        data: JSON.stringify(recipeData),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

export const recipeById = (id, token) => {
    return axios({
        method: 'GET',
        url: `/api/v1/recipes/${id}`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
}


export const updateRecipe = (id, recipeData, token) => {
    return axios({
        method: "PATCH",
        url: `/api/v1/recipes/${id}`,
        data: JSON.stringify({ recipeData }),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}