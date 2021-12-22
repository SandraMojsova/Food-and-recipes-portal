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
                <div className='upload-picture'>
                    <label>Recipe Image</label>
                    <br />
                    <img src={recipe_image} alt="" />
                    <br />
                    <div className='upload-image-button'>
                        <label for="upload">Upload image</label>
                        <input type="file" id="upload" />
                    </div>
                </div>
            </div >
        </div >
    )
}