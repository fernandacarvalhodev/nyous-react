import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './pages/home';
import Login from './pages/login';
import Cadastrar from './pages/cadastrar'
import NaoEncontrada from './pages/naoencontrada';
import Eventos from './pages/eventos';
import CrudEventos from './pages/admin/crudeventos';
import CrudCategorias from './pages/admin/crudcategorias';
import Dashboard from './pages/admin/dashboard';
import SemPermissao from './pages/sempermissao';

import jwt_decode from 'jwt-decode';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";

const RotaPrivada = ({component : Component, ...rest}) => (
  <Route
    {...rest}
    render={ props => 
        localStorage.getItem('token-nyous') !== null ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname :'/login', state :{from : props.location}}} />)
      }
   />
);

const RotaPrivadaAdmin= ({component : Component, ...rest}) => (
  <Route
    {...rest}
    render={ props => 
        localStorage.getItem('token-nyous') !== null && jwt_decode(localStorage.getItem('token-nyous')).role === 'admin'
        (<Component {...props} />) 
        (<Redirect to={{ pathname :'/sempermissao', state :{from : props.location}}} />)
      }
   />
);

//Define as rotas da aplicação
const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/cadastrar' component={Cadastrar} />
        <RotaPrivada path='/eventos' component={Eventos} />
        <RotaPrivadaAdmin path='/admin/dashboard' component={Dashboard} />
        <RotaPrivadaAdmin path='/admin/categorias' component={CrudCategorias} />
        <RotaPrivadaAdmin path='/admin/eventos' component={CrudEventos} />
        <RotaPrivada path='/sempermissao' component={SemPermissao} />
        <Route component={NaoEncontrada} />
      </Switch>
    </div>
  </Router>
)
 


ReactDOM.render(
  routing, 
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
