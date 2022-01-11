import React, { useState, useEffect } from 'react';
import { Card } from './Card';
import { recipesByCategory, addStar } from '../../api/recipes';
import './style.css';
import { Header } from '../Header';

export const AllCategories = () => {

    let token = localStorage.getItem("jwt");
    const [recipes, setRecipes] = useState([]);

    let url = window.location.pathname;
    let category = url.substring(url.lastIndexOf('/') + 1);

    const categoryBreakfast = async () => {
        try {
            let response = await recipesByCategory(category);
            setRecipes(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    const likePost = async (id) => {
        try {
            let response = await addStar(id, token);
            let result = response.data;
            let newData = recipes.map(item => {
                if (item._id == result._id) {
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
    }

    useEffect(() => {
        categoryBreakfast();
    }, [category])


    return (
        <div id="breakfast">
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