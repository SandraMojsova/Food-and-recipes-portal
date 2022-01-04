import React from "react";

export const Recipe = ({ recipeData, back_button, backToMyRecipes, recipeImage, createRecipe, createRecipeBtn, recipe_image, RecipeBtn }) => {
    return (
        <div>
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
                                className="inputs"
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
                    <button className="save-btn" onClick={createRecipeBtn ? createRecipeBtn : RecipeBtn}>
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
        </div>
    )
}