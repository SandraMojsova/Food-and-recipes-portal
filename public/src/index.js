import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';

ReactDOM.render(
  <Router>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </Router>
  , document.getElementById('root'));