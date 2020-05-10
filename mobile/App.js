import 'intl';//faz a estilização de como os valores em reais ou dolar são mostrados
import 'intl/locale-data/jsonp/pt-BR';


import React from 'react';

import Routes from './src/routes'//importa as rotas criadas no arquivo routes.js

export default function App() {
  return (
    <Routes />
  );
}

