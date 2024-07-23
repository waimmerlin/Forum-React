import React from "react";
import Home from "../pages/Home";
import Register from "../pages/Register";
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
          path="/register"
          element={
            <ProtectedRouteForAuth>
              <Register />
            </ProtectedRouteForAuth>
          }
        />
      </Routes>
    </AuthProvider>
  )
}

export default App;
