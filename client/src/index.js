import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Context } from './components/Context';
import './index.css';

ReactDOM.render(
    <Context>
        <Router>
            <Route path="/" component={App} />
        </Router>
    </Context>
    , document.getElementById('root'));