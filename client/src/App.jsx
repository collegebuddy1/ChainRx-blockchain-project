import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from '../components/HomePage';
import AddUser from '../components/AddUser';
import ManufactureMedicine from '../components/ManufactureMedicine';
import SellMedicine from '../components/SellMedicine';
import './App.css'; // Import your CSS file for styling

const App = () => {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/Home">Home</Link>
            </li>
            <li>
              <Link to="/Add-User">Add User</Link>
            </li>
            <li>
              <Link to="/Manufacture-Medicine">Manufacture Medicine</Link>
            </li>
            <li>
              <Link to="/Sell-Medicine">Sell Medicine</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/Home" element={<HomePage />} />
          <Route path="/Add-User" element={<AddUser />} />
          <Route path="/Manufacture-Medicine" element={<ManufactureMedicine />} />
          <Route path="/Sell-Medicine" element={<SellMedicine />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
