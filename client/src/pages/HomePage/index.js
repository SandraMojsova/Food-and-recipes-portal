import React, { useEffect, useState } from 'react';
import {getAllRecipes, addStar} from '../../api/recipes';
import {Card} from '../../components/RecipeCategories/Card';
import {Header} from '../../components/Header';
import './style.css';

export const HomePage= ()=> {

   let token = localStorage.getItem("jwt");
   const [recipes,setRecipes]= useState([]);

   const AllRecipes = async()=> {
        try{
        let response = await getAllRecipes();
        setRecipes(response.data);
        }catch(err){
            console.log(err);
        }
    }

    const likePost= async(id)=> {
        try{
            let response = await addStar(id,token);
            let result= response.data;
            let newData = recipes.map(item=> {
                if(item._id == result._id) {
                    return result;
                }
                else{
                return item;
            }})
            setRecipes(newData);
            }catch(err){
                console.log(err.response);
            }
    }

    useEffect(()=>{
        AllRecipes();
    },[]);

   let recipesArray= [...recipes];
    return(
        <div id="home-page">
            <Header text="Fresh &amp; New"/>
            <div className='new-recipes'>
            {
                recipes.slice(-3).map((item,index)=> {
                    return <Card item={item} key={index} likePost={likePost}/>
                })
            }
          </div>
            <Header text="Most Popular Recipes"/>
            <div className='new-recipes'>
            {
                recipesArray.sort((a,b) => (a.likes.length < b.likes.length) ? 1 : ((a.likes.length > b.likes.length) ? -1 : 0)).slice(0,6).map((item,index)=> {
                    return <Card item={item} key={index} likePost={likePost}/>
                })
            }
            </div>
        </div>
    )
}