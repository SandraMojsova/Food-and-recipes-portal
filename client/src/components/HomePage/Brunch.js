import React, {useState, useEffect} from 'react';
import {Card} from './Card';
import axios from 'axios';
import './style.css';

export const Brunch = ()=> {
    const [recipes, setRecipes]= useState([]);
    const categoryBrunch = async()=> {
         try{
         let response = await axios({
             method: 'GET',
             url: `/api/v1/recipes/all/brunch`,
             headers: { 'Content-Type': 'application/json' }
         })
         console.log(response.data);
         setRecipes(response.data);
         }catch(err){
             console.log(err);
         }
     }
     useEffect(()=>{
        categoryBrunch();
     },[])
 
    return(
        <div id="brunch">
             <div className="home-page-text">
                <h2 style={{ color: "#96BB36" }}>Brunch</h2>
                <div className="home-page-border"></div>
            </div>
                 <div className='new-recipes'>
            {
                recipes.map((item,index)=> {
                    return <Card item={item} key={index}  />
                })
 }
          </div>
        </div>
    )
}