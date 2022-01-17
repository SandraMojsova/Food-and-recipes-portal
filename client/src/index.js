import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Context } from './components/Context';
import '../src/assets/styles/global.css';

ReactDOM.render(
    <Context>
        <Router>
            <Route path="/" component={App} />
        </Router>
    </Context>
    , document.getElementById('root'));