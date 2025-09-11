import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import CampaignSection from './components/campaign/Campaign';
import DonationsList from './components/donationList/DonationList';
import ProtectedRoute from './components/context/privateRoute';
import Login from './components/loginout/Login';
import EmailVerify from './components/Login/EmailVerify';


function App() {
  return (
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path='/verify' element= {<EmailVerify />} />
            <Route path="/campaign" element={<CampaignSection />} />
            <Route path="/donatelist" element={
              <ProtectedRoute roles="admin">
              <DonationsList />
              </ProtectedRoute>} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
