import React, { useEffect, useState } from 'react';
import './style.css';
import {Card} from './Card';
import axios from 'axios';

export const HomePage= ()=> {

   const [r,setR]= useState([]);
   const recipes = async()=> {
        try{
        let response = await axios({
            method: 'GET',
            url: `/api/v1/recipes/all`,
            headers: { 'Content-Type': 'application/json' }
        })
        console.log(response.data);
        setR(response.data);
        }catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
     recipes();
    },[])

    console.log(r);
    return(
        <div id="home-page">
            <div className="home-page-text">
                <h2 style={{ color: "#96BB36" }}>Fresh & New</h2>
                <div className="home-page-border"></div>
            </div>
            <div className='new-recipes'>
            {
                r.slice(-3).map((item,index)=> {
                    return <Card item={item} key={index}  />
                })
 }
          </div>
          <div className="home-page-text">
                <h2 style={{ color: "#96BB36" }}>Most Popular Recipes</h2>
                <div className="home-page-border"></div>
            </div>
          
        </div>
    )
}