import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Game from "./Game";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "./Layout";
import { ToastContainer } from "react-toastify";

export default function App() {
  const user = localStorage.getItem("user");

  return (
    <div className="App">
      <Routes>

        <Route element={<Layout />}>

          <Route path="/" element={<Home />} />

          <Route
            path="/login"
            element={user ? <Navigate to="/" replace /> : <Login />}
          />

          <Route
            path="/register"
            element={user ? <Navigate to="/" replace /> : <Register />}
          />

          <Route
            path="/game"
            element={
              <ProtectedRoute>
                <Game />
              </ProtectedRoute>
            }
          />

        </Route>

      </Routes>

      <ToastContainer />
    </div>
  );
}
