import React from "react";
import "./index.css";
import { useHistory } from "react-router-dom";
import back_button from "../../images/icon_back_white.svg";
import recipe_image from "../../images/recipe-image.jpg";

export const AddRecipe = () => {
  let history = useHistory();
  const backToMyRecipes = () => {
    history.push("/my-recepies");
  };
  return (
    <div id="add-recipe">
      <div className="my-recepies-text">
        <h2 style={{ color: "#96BB36" }}>My recepies</h2>
        <div className="border"></div>
        <img
          src={back_button}
          alt=""
          onClick={backToMyRecipes}
          className="button-icon"
        />
      </div>
      <div className="profile-info">
        <div className="recipe">
          <div className="recipe-picture">
            <label className="recipe-picture-label">Recipe Image</label>
            <img src={recipe_image} alt="" id="recipe-picture"/>
          </div>
          <div className="upload-recipe-button">
            <label for="upload">Upload image</label>
            <input type="file" id="upload"  style={{ display: 'none' }} />
          </div>
        </div>
        <div className="recipe-info">
          <div className="recipe-data">
            <label htmlFor="recipe-name">Recipe Title</label>
            <input name="recipe-name" className="recipe-title-input inputs" />
          </div>
          <div className="data">
            <div className="recipe-data">
              <label htmlFor="category">Category</label>
              <select name="category" className="category inputs">
                <option value="breakfast">Breakfast</option>
                <option value="brunch">Brunch</option>
                <option value="launch">Launch</option>
                <option value="dinner">Dinner</option>
              </select>
            </div>
            <div className="recipe-data">
              <label htmlFor="preparation-time">Preparation time</label>
              <input
                name="preparation-time"
                className="preparation-and-number inputs"
              />
            </div>
            <div className="recipe-data">
              <label htmlFor="number">No. people</label>
              <input name="number" className=" preparation-and-number inputs" />
            </div>
          </div>
          <div className="recipe-data">
            <label htmlFor="description">Short description</label>
            <input name="description" className="inputs description" />
          </div>
          <button className="save-btn">Save</button>
        </div>
        <div className="recipe-data">
          <label htmlFor="recipe">Recipe</label>
          <textarea name="recipe" className="recipe inputs" />
        </div>
      </div>
    </div>
  );
};
