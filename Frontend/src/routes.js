import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';//responsavel pelas rotas no react( npm install react-router-dom)

import Logon from './pages/Logon';//importa a pagina de login
import Register from './pages/Register';//importa o pagina de cadastro de ONGS
import Profile from './pages/Profile';//importa a rota que lista os incidentes
import Newincident from './pages/Newincident';//importa a rota que lista os incidentes


export default function Routes(){
    return(
        <BrowserRouter>
          <Switch>

            <Route path="/" exact component={Logon} />
            <Route path="/register" component={Register} />
            <Route path="/profile" component={Profile} />
            <Route path="/incidents/new" component={Newincident} />

          </Switch>
        </BrowserRouter>
    );
}

/**
 * o BrowserRouter deve ficar 
 * o Swwitch é responsavel por n permitir mais de uma rota por vez(garante que apenas uma rota seja executada por momento)
 */