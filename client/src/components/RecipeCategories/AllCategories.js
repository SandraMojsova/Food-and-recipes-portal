import React, { useState, useEffect } from 'react';
import { recipesByCategory, addStar } from '../../api/recipes';
import { Header } from '../ui/Header';
import { Card } from './Card';
import { token } from '../../const';
import './style.css';

export const AllCategories = () => {

    const [recipes, setRecipes] = useState([]);

    let url = window.location.pathname;
    let category = url.substring(url.lastIndexOf('/') + 1);

    const categorySelected = async () => {
        try {
            let response = await recipesByCategory(category);
            setRecipes(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const likePost = async (id) => {
        try {
            let response = await addStar(id, token);
            let result = response.data;
            console.log(result);
            let newData = recipes.map(item => {
                if (item._id === result._id) {
                    return result;
                }
                else {
                    return item;
                }
            })
            setRecipes(newData);
        } catch (err) {
            console.log(err.response);
        }
    };

    useEffect(() => {
        categorySelected();
    }, [category]);

    return (
        <div id="categories">
            <Header text={category} />
            <div className='new-recipes'>
                {
                    recipes.map((item, index) => {
                        return <Card item={item} key={index} likePost={likePost} />
                    })
                }
            </div>
        </div>
    )
}