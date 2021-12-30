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
            </Switch>
            <Footer />

        </div>
    )
}