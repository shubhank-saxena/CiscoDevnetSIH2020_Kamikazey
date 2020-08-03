import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import Routes from './routes';
import history from './services/history';

import LangToggle from './components/LangToggle';
function App() {
  return (
    <Router history={history}>
      <>
        <Routes />
        <LangToggle />
      </>
    </Router>
  );
}

export default App;
