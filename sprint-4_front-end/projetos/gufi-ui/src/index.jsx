import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

import './index.css';

import App from './pages/Home/App';
import TiposEventos from './pages/TiposEventos/TiposEventos';
import NotFound from './pages/NotFound/NotFound';
import reportWebVitals from './reportWebVitals';

const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={App} /> {/*Home*/}
        <Route path="/tiposeventos" component={TiposEventos} /> {/*TiposEventos*/}
        <Route exact path="/notfound" component={NotFound} /> {/*NotFound*/}
        <Redirect to = "/notfound" /> {/*Redireciona para NotFound caso não encontre uma rota*/}
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
