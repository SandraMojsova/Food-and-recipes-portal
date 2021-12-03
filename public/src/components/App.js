import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Nav } from './Nav';
import { Footer } from './Footer';
import { Login } from './Login';
import { Create_Account } from './Create_Account';
import { Profile } from './Profile';
export const App = () => {
  return (
    <div id="app">
      <Nav />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/my-profile" component={Profile} />
        <Route exact path="/create-account" component={Create_Account} />
      </Switch>
      <Footer />
    </div>
  )
}