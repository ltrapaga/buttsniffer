import React from 'react';
import { StrictMode } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { AuthProvider } from './context/auth';

import MenuBar from './components/MenuBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthRoute from './util/AuthRoute';

function App() {
  return (
    <StrictMode>
    <AuthProvider>
      <Router>
        <Container> 
          <MenuBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/auth" element={<AuthRoute />} />
            <Route path="/*" element={<Navigate to="/" />} />
          </Routes>
        </Container>
      </Router>
    </AuthProvider>
    </StrictMode>
  );
}

export default App;
