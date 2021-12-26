import React, { useEffect, useState } from 'react';
import './index.css'
import { useHistory } from 'react-router-dom';
import plus from '../../images/icon_plus_white.svg'
import axios from 'axios';

export const MyRecepies = () => {
    let history = useHistory();
    const addRecepies = () => {
        history.push('/add-recipe');
    }
    const [recipes,setRecipes]= useState([]);
    let token = localStorage.getItem('jwt');
    const allRecipesByUser =async () => {
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
     }catch(err) {
            console.log(err.response)
        }
    }
   
    useEffect(()=>{
        allRecipesByUser();
    },[])
    return (
        <div id="my-recepies">
                <div  className="my-recepies-text">
                <h2 style={{ color: "#96BB36" }}>My recepies</h2>
                <div className="border"></div>
                <img src={plus} alt="" className="button-icon" onClick={addRecepies} />
                </div>
                <table border="1">
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
                             recipes.map((recipe,i)=>{
                                 return(
                                     <tr key={i}>
                                         <td>{recipe.recipe_title}</td>
                                         <td>{recipe.category}</td>
                                         <td>{recipe._created}</td>
                                         <td>delete</td>
                                         </tr>
                                 )
                             })
                         }
                    </tbody>
                </table>
        </div>
    )
}