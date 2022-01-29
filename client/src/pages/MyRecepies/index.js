import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { recipesByUser } from '../../api/recipes';
import { token } from '../../const';
import add_icon from '../../assets/images/icon_plus_white.svg';
import trash_icon from '../../assets/images/icon_trashcan.svg';
import { Modal } from './Modal';
import './style.css';

export const MyRecepies = () => {

    let history = useHistory();

    const [recipes, setRecipes] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [id, setId] = useState('');

    const addRecepies = () => {
        history.push('/add-recipe');
    };

    const allRecipesByUser = async () => {
        try {
            let res = await recipesByUser(token);
            setRecipes(res.data);
        } catch (err) {
            console.log(err.response);
        }
    }

    const removeRecipe = async (event, id) => {
        event.stopPropagation();
        setModalOpen(true);
        setId(id);
    }

    useEffect(() => {
        allRecipesByUser();
    }, []);

    return (
        <div id="my-recepies">
            <div className="my-recepies-text">
                <h2>My Recipes</h2>
                <div className="border"></div>
                <img src={add_icon} alt="" className="add-button-icon" onClick={addRecepies} />
            </div>
            {modalOpen && <Modal setModalOpen={setModalOpen} id={id} recipes={recipes} setRecipes={setRecipes}></Modal>}
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
                                    <td style={{ color: "#A5A5A5" }}>{recipe.recipe_title}</td>
                                    <td className="recipe-category-green-box"><span>{recipe.category}</span></td>
                                    <td style={{ color: "#A5A5A5" }}>{recipe._created}</td>
                                    <td onClick={(event) => { removeRecipe(event, recipe._id) }}><img src={trash_icon} alt="" /></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div >
    )
}

