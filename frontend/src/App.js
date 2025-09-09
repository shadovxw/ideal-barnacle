import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/home/Home';
import CampaignSection from './components/campaign/Campaign';

import DonationsList from './components/donationList/DonationList';

function App() {
  
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/campaign" element={<CampaignSection />} />

          <Route path="/donatelist" element={<DonationsList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
