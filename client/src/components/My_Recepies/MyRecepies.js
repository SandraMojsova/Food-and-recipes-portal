import React, { useEffect, useState } from 'react';
import './index.css'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import plus from '../../images/icon_plus_white.svg';
import trash_icon from '../../images/icon_trashcan.svg';
import axios from 'axios';

export const MyRecepies = () => {
    let history = useHistory();
    const addRecepies = () => {
        history.push('/add-recipe');
    }
    const [recipes, setRecipes] = useState([]);
    const [id, setId] = useState(null);
    let token = localStorage.getItem('jwt');
    const allRecipesByUser = async () => {
        try {
            let res = await axios({
                method: 'GET',
                url: `/api/v1/recipes/me`,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log(res.data);
            setRecipes(res.data);
        } catch (err) {
            console.log(err.response)
        }
    }

    const removeRecipe = async (id) => {
        let selectedRecipe = recipes.find((recipe) => recipe._id === id);
        try {
            await axios({
                method: 'DELETE',
                url: `/api/v1/recipes/${selectedRecipe._id}`,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setRecipes([...recipes].filter((recipe) => recipe._id !== id));
        } catch (err) {
            console.log(err.response)
        }
    }

    useEffect(() => {
        allRecipesByUser();
    }, [])
    return (
        <div id="my-recepies">
            <div className="my-recepies-text">
                <h2 style={{ color: "#96BB36" }}>My recepies</h2>
                <div className="border"></div>
                <img src={plus} alt="" className="button-icon" onClick={addRecepies} />
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
                                    {/* <Link to={`/my-recepies/${recipe._id}`}></Link> */}
                                    <td>{recipe.recipe_title}</td>
                                    <td className="recipe-category">{recipe.category}</td>
                                    <td>{recipe._created}</td>
                                    <td onClick={() => { removeRecipe(recipe._id) }}><img src={trash_icon} /></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div >
    )
}