import React from 'react';
import logo from './logo.svg';
import 'assets/scss/main.style.scss';

import { Button } from 'antd';
import { Trans } from '@lingui/react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Trans id="home.learn-react" />
        </a>




        <Button type="primary"> <Trans id="home.signin" /></Button>
      </header>
    </div>
  );
}

export default App;
