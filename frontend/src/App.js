import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Home from './Pages/Home';
import PrivateRoute from './Pages/PrivateRoute';
import AdminRoute from './Pages/AdminRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <h1 style={{ textAlign: 'center' }}>Bienvenido a MediSync</h1>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/register"
            element={
              <AdminRoute>
                <Register />
              </AdminRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
