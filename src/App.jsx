import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import QuickSort from "./components/QuickSort";
import MergeSort from "./components/MergeSort";
import "./Navbar.css";  // Import Navbar CSS

const App = () => {
  return (
    <Router>
      <div>
        {/* Navigation Bar */}
        <nav className="navbar">
          <ul>
            <li><Link to="/">QuickSort</Link></li>
            <li><Link to="/merge">MergeSort</Link></li>
          </ul>
        </nav>

        {/* Page Content (Prevents Overlapping) */}
        <div className="page-content">
          <Routes>
            <Route path="/" element={<QuickSort />} />
            <Route path="/merge" element={<MergeSort />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
