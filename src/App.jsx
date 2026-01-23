import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import DataEntry from './pages/DataEntry';
import BhoothankettDashboard from './pages/BhoothankettDashboard';
import DDMADashboard from './pages/DDMADashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/bhoothankett-dashboard" element={<BhoothankettDashboard />} />
        <Route path="/bhoothankett-data-entry" element={<DataEntry />} />
        <Route path="/ddma-dashboard" element={<DDMADashboard />} />
        
      </Routes>
    </Router>
  );
}
export default App;
