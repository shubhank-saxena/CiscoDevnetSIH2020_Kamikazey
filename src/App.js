import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import Routes from './routes';
import history from './services/history';
import { Connector } from 'mqtt-react';

import LangToggle from './components/LangToggle';
function App() {
  return (
    // <Connector mqttProps="wss://52.10.7.74:8080">
    <Router history={history}>
      <>
        <Routes />
        <LangToggle />
      </>
    </Router>
    // </Connector>
  );
}

export default App;
