import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Login, Home, Settings } from './pages/';
import Feedback from './components/Feedback';
import Ranking from './components/Ranking';

const Rotas = () => (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route path="/home" component={Home} />
    <Route path="/settings" component={Settings} />
    <Route path="/feedback" component={Feedback} />
    <Route path="/ranking" component={Ranking} />
  </Switch>
);

export default Rotas;
