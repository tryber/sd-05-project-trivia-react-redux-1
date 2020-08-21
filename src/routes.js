import React from 'react';
import { Switch, Route} from 'react-router-dom';
import { Login, Home, Settings } from './pages/';

const Rotas = () => (
  <Switch>
    <Route exact path='/' component={Login} />
    <Route path='/home' component={Home} />
    <Route path='/settings' component={Settings} />
  </Switch>
);

export default Rotas;
