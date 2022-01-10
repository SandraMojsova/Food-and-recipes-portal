import React, {useState, useEffect} from 'react';
import {Card} from './Card';
import { recipesByCategory , addStar} from '../../api/recipes';
import './style.css';
import {Header} from '../Header';

export const AllCategories = ()=> {

    let token = localStorage.getItem("jwt");
    const [recipes, setRecipes]= useState([]);

    const c = ["breakfast", "lunch", "brunch", "dinner"];
    let category = window.location.pathname.slice(1);

    let s = c.filter(ca=> {
        if(ca === category) {
        console.log(ca);
        return ca; }

    })

    console.log(s[0]);

    const categoryBreakfast = async()=> {
         try{
         let response = await recipesByCategory(s[0]);
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
        categoryBreakfast();
     },[])

 
    return(
        <div id="breakfast">
             {/* <div className="home-page-text">
                <h2 style={{ color: "#96BB36" }}>Breakfast</h2>
                <div className="home-page-border"></div>
            </div> */}
            <Header text={category}/>
                 <div className='new-recipes'>
            {
                recipes.map((item,index)=> {
                    return <Card item={item} key={index} likePost={likePost}  />
                })
            }
          </div>
        </div>
    )
}