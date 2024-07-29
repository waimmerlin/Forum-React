import React from "react";
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import Register from "./pages/Register";
import Header from "./components/Header/Header";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

import { AuthProvider } from './hooks/useAuth';
import { ProtectedRoute, ProtectedRouteForAuth } from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route
          exact path='/'
          element={<Home />}
        />

        <Route 
          path="/profile"
          element={
            // <ProtectedRoute>
              <Profile />
            // </ProtectedRoute>
          }
        />

        <Route
          path="/register"
          element={
            <ProtectedRouteForAuth>
              <Register />
            </ProtectedRouteForAuth>
          }
        />

        <Route
          path="/login"
          element={
            <ProtectedRouteForAuth>
              <Login />
            </ProtectedRouteForAuth>
          }
        />
      </Routes>
    </AuthProvider>
  )
}

export default App;
