import React from 'react';
import './index.css';
import { useHistory } from 'react-router-dom';
import back_button from '../../images/icon_back_white.svg'
import recipe_image from '../../images/profile-pic.jpg'

export const AddRecipe = () => {
    let history = useHistory();
    const backToMyRecipes = () => {
        history.push('/my-recepies');
    }
    return (
        <div id="add-recipe">
            <div className="my-recepies-text">
                <h2 style={{ color: "#96BB36" }}>My recepies</h2>
                <div className="border"></div>
                <img src={back_button} alt="" onClick={backToMyRecipes} className="button-icon" />
            </div>
            <div className="profile-info">
                <div>
                    <div className='upload-picture'>
                        <label>Recipe Image</label>
                        <br />
                        <img src={recipe_image} alt="" />
                    </div>
                    <div className='upload-image-button'>
                        <label for="upload">Upload image</label>
                        <input type="file" id="upload" />
                    </div>
                </div>
                <div className="recipe-info">
                    <div className="recipe-data">
                        <label htmlFor="recipe-name">Recipe Name</label>
                        <input name="recipe-name" className="recipe-title-input" />
                    </div>
                    <div className="data">
                        <div className="recipe-data">
                            <label htmlFor="category">Category</label>
                            <input name="category-name" />
                        </div>
                        <div className="recipe-data">
                            <label htmlFor="preparation-time">Preparation time</label>
                            <input name="preparation-time" />
                        </div>
                        <div className="recipe-data">
                            <label htmlFor="number">No. people</label>
                            <input name="number" />
                        </div>
                    </div>
                    <div className="recipe-data">
                        <label htmlFor="description">Short description</label>
                        <input name="description" />
                    </div>
                    <button>Save</button>
                </div>
                <div className="recipe" className="recipe-data">
                    <label htmlFor="recipe">Recipe</label>
                    <textarea name="recipe" />
                </div>
            </div>
        </div>
    )
}