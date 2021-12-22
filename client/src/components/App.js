import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Nav } from './Nav';
import { Footer } from './Footer';
import { Login } from './Login';
import { Create_Account } from './Create_Account/Create_Account';
import { My_Profile } from './My_Profile/My_Profile';
import { Context } from './Context';
import { MyRecepies } from './My_Recepies/MyRecepies';
import { AddRecipe } from './My_Recepies/AddRecipe'
export const App = () => {
    return (
        <div id="app">
            <Context>
                <Nav />
            </Context>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/create-account" component={Create_Account} />
                <Route path="/my-profile" component={My_Profile} />
                <Route path="/my-recepies" component={MyRecepies} />
                <Route path="/add-recipe" component={AddRecipe} />
            </Switch>
            <Footer />
        </div>
    )
}