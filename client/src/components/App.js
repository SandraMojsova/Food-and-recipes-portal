import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Nav } from './Nav';
import { Footer } from './Footer';
import { Login } from './Login';
import { CreateAccount } from './CreateAccount';
import { My_Profile } from './My_Profile/My_Profile';
import { Context } from './Context';
import { MyRecepies } from './My_Recepies/MyRecepies';
import { AddRecipe } from './My_Recepies/AddRecipe';
import { UpdateRecipe } from './My_Recepies/UpdateRecipe';
export const App = () => {
    return (
        <div id="app">
            <Context>
                <Nav />
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/create-account" component={CreateAccount} />
                    <Route path="/my-profile" component={My_Profile} />
                    <Route path="/my-recepies" component={MyRecepies} />
                    <Route path="/add-recipe" component={AddRecipe} />
                    <Route path="/update-recipe/:id" component={UpdateRecipe} />
                </Switch>
                <Footer />
            </Context>

        </div>
    )
}