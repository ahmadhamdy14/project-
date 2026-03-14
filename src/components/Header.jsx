import React, { useState, useEffect } from "react";
import "./header.css";
import Login from "../Login";
import Register from "../Register";
import { useNavigate } from "react-router-dom";
export default function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const openLogin = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  const openRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };
  const goHome = () => {
    navigate("/");
};
const goGame = () => {
  navigate("/game");
}

  return (
    <>
      <nav>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 50px" }}>
        <button className="login-btn" onClick={goHome}>Home</button>

              <button className="login-btn" onClick={goGame}>
                Game </button>
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <button className="login-btn" onClick={handleLogout}>
                Logout
              </button>
              <span className="login-btn" style={{ fontWeight: "bold", color: "green" }}>👤 {user.name}</span>
            </div>
          ) : (
            <div>
              <button className="login-btn" onClick={openLogin}>
                Login
              </button>
              <button className="login-btn" onClick={openRegister}>
                Register
              </button>
            </div>
          )}
        </div>
      </nav>

      {showLogin && (
        <Login
          onClose={() => {
            setShowLogin(false);
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
              setUser(JSON.parse(storedUser));
            }
          }}
          onSwitchToRegister={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
        />
      )}

      {showRegister && (
        <Register
          onClose={() => setShowRegister(false)}
          onSwitchToLogin={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
        />
      )}
    </>
  );
}
