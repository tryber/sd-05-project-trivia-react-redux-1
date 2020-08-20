import React from 'react';
import { Switch, Route} from 'react-router-dom';
import { Login, Home } from './pages/';

const Rotas = () => (
  <Switch>
    <Route exact path='/' component={Home} />
    <Route path='/login' component={Login} />
  </Switch>
);

export default Rotas;
