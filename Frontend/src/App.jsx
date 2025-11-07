import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Depense from "./pages/Depense";
import AuthProvider, { AuthContext } from "./context/authContext";
import { useContext } from "react";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Authentificated>
                <Login />
              </Authentificated>
            }
          />
          <Route
            path="/register"
            element={
              <Authentificated>
                <Register />
              </Authentificated>
            }
          />

          <Route
            path="/depenses"
            element={
              <PrivateRoute>
                <Depense />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

const PrivateRoute = ({ children }) => {
  // const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const Authentificated = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/depenses" replace />;
  }

  return children;
};
