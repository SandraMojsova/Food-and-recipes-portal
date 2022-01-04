import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Nav } from './Nav';
import { Footer } from './Footer';
import { Login } from './Login';
import { CreateAccount } from './CreateAccount';
import { MyProfile } from './MyProfile';
// import { Context } from './Context';
import { MyRecepies } from './My_Recepies/MyRecepies';
import { AddRecipe } from './My_Recepies/AddRecipe';
import { UpdateRecipe } from './My_Recepies/UpdateRecipe';
import { HomePage } from './HomePage/HomePage';
import {Breakfast} from './HomePage/Breakfast';
import {Brunch} from './HomePage/Brunch';
import { Lunch } from './HomePage/Lunch';
import {Dinner} from './HomePage/Dinner'
export const App = () => {
    return (
        <div id="app">
            <Nav />
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/create-account" component={CreateAccount} />
                <Route path="/my-profile" component={MyProfile} />
                <Route path="/my-recepies" component={MyRecepies} />
                <Route path="/add-recipe" component={AddRecipe} />
                <Route path="/update-recipe/:id" component={UpdateRecipe} />
                <Route path="/breakfast" component={Breakfast} />
                <Route path="/brunch" component={Brunch} />
                <Route path="/lunch" component={Lunch} />
                <Route path="/dinner" component={Dinner} />
                <Route path="/" component={HomePage} />
            </Switch>
            <Footer />

        </div>
    )
}