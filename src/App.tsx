import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import './App.css';

import { MainPage } from './Pages/MainPage/MainPage';

const App = () => {

  return (
    <MainPage/>
  );
};

export default App;