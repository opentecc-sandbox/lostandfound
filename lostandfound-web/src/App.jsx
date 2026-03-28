import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ReportLost from './pages/ReportLost';
import ReportFound from './pages/ReportFound';

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Router>
      <div className="pt-20"> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/lost" 
            element={
              isAuthenticated ? <ReportLost /> : <Navigate to="/login" replace />
            } 
          />
          <Route path="/found" 
            element={
              isAuthenticated ? <ReportFound /> : <Navigate to="/login" replace />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;