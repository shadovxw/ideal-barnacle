import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import CampaignSection from './components/campaign/Campaign';
import DonationsList from './components/donationList/DonationList';
import Login from './components/login/Login';
import { AppContextProvider } from './components/context/appContext';

function App() {
  return (
    <AppContextProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/campaign" element={<CampaignSection />} />
            <Route path="/donatelist" element={<DonationsList />} />
          </Routes>
        </div>
      </Router>
    </AppContextProvider>
  );
}

export default App;
