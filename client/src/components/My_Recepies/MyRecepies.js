import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { recipesByUser, deleteRecipe } from '../../api/recipes'
import add_icon from '../../images/icon_plus_white.svg';
import trash_icon from '../../images/icon_trashcan.svg';
import './index.css'

export const MyRecepies = () => {

    let token = localStorage.getItem('jwt');

    let history = useHistory();
    const addRecepies = () => {
        history.push('/add-recipe');
    };

    const [recipes, setRecipes] = useState([]);
    const [id, setId] = useState(null);
    const [err, setErr] = useState(null);

    const allRecipesByUser = async () => {
        try {
            let res = await recipesByUser(token);
            setRecipes(res.data);
        } catch (err) {
            console.log(err.response)
            setErr(err.response)
        }
    }

    const removeRecipe = async (event,id) => {
        event.stopPropagation();
        let selectedRecipe = recipes.find((recipe) => recipe._id === id);
        try {
            await deleteRecipe(selectedRecipe._id, token)
            setRecipes([...recipes].filter((recipe) => recipe._id !== id));
        } catch (err) {
            console.log(err.response);
            setErr(err.response)
        }
    }

    useEffect(() => {
        allRecipesByUser();
    }, []);

    return (
        <div id="my-recepies">
            <div className="my-recepies-text">
                <h2>My recepies</h2>
                <div className="border"></div>
                <img src={add_icon} alt="" className="add-button-icon" onClick={addRecepies} />
            </div>
            <table className="recipes-table">
                <thead>
                    <tr>
                        <th>Recipe Name</th>
                        <th>Category</th>
                        <th>Created On</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        recipes.map((recipe, i) => {
                            return (
                                <tr key={i} onClick={() => { history.push(`/update-recipe/${recipe._id}`) }}>
                                    <td style={{color: "#A5A5A5"}}>{recipe.recipe_title}</td>
                                    <td className="recipe-category-green-box"><span>{recipe.category}</span></td>
                                    <td style={{color: "#A5A5A5"}}>{recipe._created}</td>
                                    <td onClick={(event) => { removeRecipe(event, recipe._id) }}><img src={trash_icon} /></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div >
    )
}