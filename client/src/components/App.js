import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Nav } from './Nav';
import { Footer } from './Footer';
import { Login } from '../pages/Login';
import { CreateAccount } from '../pages/CreateAccount';
import { MyProfile } from '../pages/MyProfile';
import { MyRecepies } from '../pages/MyRecepies';
import { AddRecipe } from './MyRecepies/AddRecipe';
import { UpdateRecipe } from './MyRecepies/UpdateRecipe';
import { HomePage } from '../pages/HomePage';
import { Breakfast } from './RecipeCategories/Breakfast';
import { Brunch } from './RecipeCategories/Brunch';
import { Lunch } from './RecipeCategories/Lunch';
import { Dinner } from './RecipeCategories/Dinner';
import { AllCategories} from '../components/RecipeCategories/AllCategories';

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
                <Route path="/brunch" component={AllCategories} />
                <Route path="/lunch" component={AllCategories} />
                <Route path="/dinner" component={AllCategories} />
                <Route path="/" component={HomePage} />
            </Switch>
            <Footer />
        </div>
    )
}