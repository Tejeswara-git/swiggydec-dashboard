import React from "react";

const Navbar = ({
  handleRegister,
  handleLogin,
  showlogouthandle,
  firmtitle,
  showlogout,
}) => {
  return (
    <div className="navbar">
      <div className="logo">DASHBOARD</div>
      <div className="firmtitle">
        <h1>Firmname: {firmtitle}</h1>
      </div>
      <div className="auth-buttons">
        {!showlogout ? (
          <>
            <p onClick={handleLogin}>Login</p>
            <p onClick={handleRegister}>Register</p>
          </>
        ) : (
          <p onClick={showlogouthandle}>Logout</p>
        )}
      </div>
    </div>
  );
};

export default Navbar;
