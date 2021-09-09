import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Routes from './routes/Routes';

import './App.scss';

import Sidebar from './components/Sidebar/Sidebar';
export default function App() {
  return (
    <Router className="App">
      <Sidebar />
      <Routes />
    </Router>
  );
}
