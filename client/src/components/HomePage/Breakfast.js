import React, {useState, useEffect} from 'react';
import {Card} from './Card';
import axios from 'axios';
import './style.css';

export const Breakfast = ()=> {
    const [recipes, setRecipes]= useState([]);
    const categoryBreakfast = async()=> {
         try{
         let response = await axios({
             method: 'GET',
             url: `/api/v1/recipes/all/breakfast`,
             headers: { 'Content-Type': 'application/json' }
         })
         console.log(response.data);
         setRecipes(response.data);
         }catch(err){
             console.log(err);
         }
     }
     useEffect(()=>{
        categoryBreakfast();
     },[])
 
    return(
        <div id="breakfast">
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