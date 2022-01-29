import React from "react";
import { Error } from "../ui/Error";
import { Input } from "../ui/Input";
import { Button } from '../ui/Button';

export const Recipe = ({ recipeData, back_button, backToMyRecipes, recipeImage, recipeFieldUpdate, saveRecipeBtn, recipe_image, uploadedImage, err }) => {
    return (
        <div>
            <div className="my-recepies-text-box">
                <h2>My Recipes</h2>
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
                        {uploadedImage === null ? <img
                            src={recipeData.image ? `${recipeData.image}` : recipe_image}
                            alt=""
                        /> : <img src={uploadedImage} alt="" />
                        }
                    </div>
                    <div className="upload-recipe-button">
                        <label htmlFor="upload">Upload image</label>
                        <input
                            type="file"
                            id="upload"
                            style={{ display: "none" }}
                            onChange={recipeImage}
                        />
                    </div>
                </div>
                <div className="recipe-info">
                    <Input name="recipe_title" text="Recipe Title" type="text" value={recipeData.recipe_title} onChange={recipeFieldUpdate} className="recipe-data" inputClassName="recipe-title-input inputs" />
                    <div className="data">
                        <div className="recipe-data">
                            <label htmlFor="category">Category</label>
                            <select
                                name="category"
                                className="inputs select-category"
                                value={recipeData.category}
                                onChange={recipeFieldUpdate}
                            >
                                <option value="none" hidden>Select Category</option>
                                <option value="breakfast">Breakfast</option>
                                <option value="brunch">Brunch</option>
                                <option value="lunch">Lunch</option>
                                <option value="dinner">Dinner</option>
                            </select>
                        </div>
                        <Input name="preparation_time" text="Preparation time" type="number" value={recipeData.preparation_time} onChange={recipeFieldUpdate} className="recipe-data" inputClassName="preparation-and-number inputs" />
                        <Input name="people" text="No. people" type="number" value={recipeData.people} onChange={recipeFieldUpdate} className="recipe-data" inputClassName="preparation-and-number inputs" />
                    </div>
                    <div className="recipe-data">
                        <label htmlFor="short_description">Short description</label>
                        <textarea
                            name="short_description"
                            className="description"
                            value={recipeData.short_description}
                            onChange={recipeFieldUpdate}
                            rows={5}
                        />
                    </div>
                    <div>
                        <Button className="save-btn" onClick={saveRecipeBtn} text="Save" />
                        {err && <Error err={err} />}
                    </div>
                </div>
                <div className="recipe-data">
                    <label htmlFor="recipe">Recipe</label>
                    <textarea
                        name="recipe"
                        className="recipe-details"
                        value={recipeData.recipe}
                        onChange={recipeFieldUpdate}
                        rows={20}
                    />
                </div>
            </div>
        </div>
    )
}