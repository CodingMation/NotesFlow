import {  BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Notes from './pages/Notes';
import About from './pages/About';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/" 
            element={
              <PrivateRoute>
                <Notes />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/about" 
            element={
              <PrivateRoute>
                <About />
              </PrivateRoute>
            } 
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
}

export default App;