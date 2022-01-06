import React, { useEffect, useState } from 'react';
import './style.css';
import {Card} from './Card';
import axios from 'axios';

export const HomePage= ()=> {
    let token = localStorage.getItem('jwt');

   const [r,setR]= useState([]);

//    const update = (e) => {
//     setR({ ...r, likes: e.target.value })
// };
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
    const likePost= async(id)=> {
        try{
            let response = await axios({
                method: 'PUT',
                url: `/api/v1/recipes/like/${id}`,
                data : JSON.stringify({id}),
                headers: { 'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` }
            })
            console.log(response);
            console.log(response.data);
            console.log(response.data.likes);
            }catch(err){
                console.log(err.response);
            }
    }

    useEffect(()=>{
     recipes();
    },[])

    return(
        <div id="home-page">
            <div className="home-page-text">
                <h2 style={{ color: "#96BB36" }}>Fresh & New</h2>
                <div className="home-page-border"></div>
            </div>
            <div className='new-recipes'>
            {
                r.slice(-3).map((item,index)=> {
                    return <Card item={item} key={index} likePost={likePost}/>
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