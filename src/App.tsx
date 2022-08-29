import React from 'react';
import 'assets/scss/main.style.scss';

import { Route, Routes } from 'react-router-dom';

// Pages 
import Home from 'pages/Home'
import PageNotFound from 'pages/errors/PageNotFound';

// Config
import { SiteRoutes } from 'config/constants';

//
// Core
//
function App() {
  return (
    <div className="app">
      <Routes>
        <Route path={SiteRoutes.HOME} element={<Home />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
