import React, { useLayoutEffect } from 'react';
import 'assets/scss/main.style.scss';

import { Route, Routes, useLocation } from 'react-router-dom';

// Pages 
import Home from 'pages/Home'
import RsvpForm from 'pages/RsvpForm'
import ThingsToDo from 'pages/ThingsToDo';
import GuestAccommodations from 'pages/GuestAccommodations';
import QuestionsAnswers from 'pages/QuestionsAnswers';
import PageNotFound from 'pages/errors/PageNotFound';

// Config
import { SiteRoutes } from 'config/constants';

//
// Core
//
function App() {
  // Hooks
  const location = useLocation();

  // Scroll to top on each page change
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  
  return (
    <div className="app">
      <Routes>
        <Route path={SiteRoutes.HOME} element={<Home />} />
        <Route path={SiteRoutes.RSVP_FORM} element={<RsvpForm />} />
        <Route path={SiteRoutes.QA} element={<QuestionsAnswers />} />
        <Route path={SiteRoutes.GUEST_ACCOMMODATIONS} element={<GuestAccommodations />} />
        <Route path={SiteRoutes.THINGS_TO_DO} element={<ThingsToDo />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
