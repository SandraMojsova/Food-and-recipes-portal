import React from "react";

export const Recipe = ({ recipeData, back_button, backToMyRecipes, recipeImage, createRecipe, saveRecipeBtn, recipe_image }) => {
    return (
        <div>
            <div className="my-recepies-text-box">
                <h2>My recepies</h2>
                <div className="border"></div>
                <img
                    src={back_button}
                    alt=""
                    onClick={backToMyRecipes}
                    className="back-button-icon"
                />
            </div>
            <div className="recipe-form-box">
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
                                className="inputs select-category"
                                value={recipeData.category}
                                onChange={createRecipe}
                            >
                                <option value="breakfast">Breakfast</option>
                                <option value="brunch">Brunch</option>
                                <option value="lunch">Lunch</option>
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
                        <textarea
                            name="short_description"
                            className="description"
                            value={recipeData.short_description}
                            onChange={createRecipe}
                            rows={5}
                        />
                    </div>
                    <button className="save-btn" onClick={saveRecipeBtn}>
                        Save
                    </button>
                </div>
                <div className="recipe-data">
                    <label htmlFor="recipe">Recipe</label>
                    <textarea
                        name="recipe"
                        className="recipe-details"
                        value={recipeData.recipe}
                        onChange={createRecipe}
                        rows={20}
                    />
                </div>
            </div>
        </div>
    )
}