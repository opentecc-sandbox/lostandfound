import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

import Login from './pages/Login';
import Register from './pages/Register';
import ReportLost from './pages/ReportLost';
import ReportFound from './pages/ReportFound';

function App() {
  return (
    <Router>
      {/* 1. The Navbar stays here so it shows on EVERY page */}
      

      {/* 2. Content wrapper with top padding so Navbar doesn't cover text */}
      <div className="pt-20"> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/lost" element={<ReportLost />} />
          <Route path="/found" element={<ReportFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;