import React, { useState } from "react";
import "./index.css";
import { useHistory } from "react-router-dom";
import back_button from "../../images/icon_back_white.svg";
import recipe_image from "../../images/recipe-image.jpg";
import axios from "axios";

export const AddRecipe = () => {
  let token = localStorage.getItem("jwt");
  let history = useHistory();
  const backToMyRecipes = () => {
    history.push("/my-recepies");
  };
  const [recipeData, setRecipeData] = useState({
    recipe_title: "",
    category: "",
    preparation_time: "",
    people: "",
    short_description: "",
    recipe: "",
    image: "",
  });
  const [err, setError] = useState(null);
  const createRecipe = (e) => {
    setRecipeData({
      ...recipeData,
      [e.target.name]: e.target.value,
    });
  };

  const recipeImage = async (event) => {
    let image = event.target.files[0];
    console.log(image);
    const dataf = new FormData();
    dataf.append('file', image);
    console.log(dataf);
    try {
      const res = await axios({
        method: 'POST',
        url: `/api/v1/storage/recipes`,
        data: dataf,
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        }
    })
      console.log(res);
      console.log(res.data);
      let p = res.data.filename;
      setRecipeData({ ...recipeData, image: p });
    } catch (err) {
      console.log(err.response);
    }
  };
  const createRecipeBtn = async (e) => {
    e.preventDefault();
    try {
      let res = await axios({
        method: "POST",
        url: `/api/v1/recipes`,
        data: JSON.stringify(recipeData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      history.push("/my-recepies");
    } catch (err) {
      setError(err.response.data);
    }
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
            <img
              src={recipeData.image ? `${recipeData.image}` : recipe_image}
              alt=""
              id="recipe-picture"
            />
          </div>
          <div className="upload-recipe-button">
            <label for="upload">Upload image</label>
            <input
              type="file"
              id="upload"
              style={{ display: "none" }}
              onChange={recipeImage}
            />
          </div>
        </div>
        <div className="recipe-info">
          <div className="recipe-data">
            <label htmlFor="recipe_title">Recipe Title</label>
            <input
              name="recipe_title"
              className="recipe-title-input inputs"
              value={recipeData.recipe_title}
              onChange={createRecipe}
            />
          </div>
          <div className="data">
            <div className="recipe-data">
              <label htmlFor="category">Category</label>
              <select
                name="category"
                className="category inputs"
                value={recipeData.category}
                onChange={createRecipe}
              >
                <option value="breakfast">Breakfast</option>
                <option value="brunch">Brunch</option>
                <option value="launch">Launch</option>
                <option value="dinner">Dinner</option>
              </select>
            </div>
            <div className="recipe-data">
              <label htmlFor="preparation-time">Preparation time</label>
              <input
                name="preparation_time"
                className="preparation-and-number inputs"
                value={recipeData.preparation_time}
                onChange={createRecipe}
              />
            </div>
            <div className="recipe-data">
              <label htmlFor="people">No. people</label>
              <input
                name="people"
                className=" preparation-and-number inputs"
                value={recipeData.people}
                onChange={createRecipe}
              />
            </div>
          </div>
          <div className="recipe-data">
            <label htmlFor="short_description">Short description</label>
            <input
              name="short_description"
              className="inputs description"
              value={recipeData.short_description}
              onChange={createRecipe}
            />
          </div>
          <button className="save-btn" onClick={createRecipeBtn}>
            Save
          </button>
        </div>
        <div className="recipe-data">
          <label htmlFor="recipe">Recipe</label>
          <textarea
            name="recipe"
            className="recipe inputs"
            value={recipeData.recipe}
            onChange={createRecipe}
          />
        </div>
      </div>
      {err && <h3>{err}</h3>}
    </div>
  );
};
