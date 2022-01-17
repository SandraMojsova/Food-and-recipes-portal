import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Nav } from './components/ui/Nav';
import { Footer } from './components/ui/Footer';
import { Login } from './pages/Login';
import { CreateAccount } from './pages/CreateAccount';
import { MyProfile } from './pages/MyProfile';
import { MyRecepies } from './pages/MyRecepies';
import { AddRecipe } from './components/MyRecepies/AddRecipe';
import { UpdateRecipe } from './components/MyRecepies/UpdateRecipe';
import { HomePage } from './pages/HomePage';
import { AllCategories } from './components/RecipeCategories/AllCategories';
import { ProtectedRoute } from './components/ProtectedRoute';

export const App = () => {
    return (
        <div id="app">
            <Nav />
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/login" component={Login} />
                <Route path="/create-account" component={CreateAccount} />
                <ProtectedRoute path="/my-profile" component={MyProfile} />
                <Route path="/my-recepies" component={MyRecepies} />
                <Route path="/add-recipe" component={AddRecipe} />
                <Route path="/update-recipe/:id" component={UpdateRecipe} />
                <Route path="/category/:category" component={AllCategories} />
            </Switch>
            <Footer />
        </div>
    )
}