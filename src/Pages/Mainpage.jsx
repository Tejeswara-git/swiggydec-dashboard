import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Register from "../Components/Register";
import Login from "../Components/Login";
import AddFirm from "../Components/AddFirm";
import AddProduct from "../Components/AddProduct";
import Allproducts from "../Components/Allproducts";
import Welcome from "../Components/Welcome";
import { useEffect } from "react";

const Mainpage = () => {
  const [showregister, setShowRegister] = useState(false);
  const [showlogin, setShowLogin] = useState(false);
  const [showaddfirm, setShowAddFirm] = useState(false);
  const [showaddproduct, setShowAddProduct] = useState(false);
  const [showallproducts, setShowAllProducts] = useState(false);
  const [showwelcome, setShowWelcome] = useState(true);
  const [showlogout, setShowLogout] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const firmtitle = localStorage.getItem("FirmName");

  useEffect(() => {
    if (token) {
      setShowLogout(true);
    } else {
      setShowLogout(false);
    }
  }, [token]);

  const handleRegister = () => {
    setShowRegister(true);
    setShowLogin(false);
    setShowAddFirm(false);
    setShowAddProduct(false);
    setShowAllProducts(false);
    setShowWelcome(false);
  };
  const handleLogin = () => {
    setShowRegister(false);
    setShowLogin(true);

    setShowAddFirm(false);
    setShowAddProduct(false);
    setShowAllProducts(false);
    setShowWelcome(false);
  };
  const handleAddFirm = () => {
    setShowRegister(false);
    setShowLogin(false);
    setShowAddFirm(true);
    setShowAddProduct(false);
    setShowAllProducts(false);
    setShowWelcome(false);
  };
  const handleAddProduct = () => {
    setShowRegister(false);
    setShowLogin(false);
    setShowAddFirm(false);
    setShowAddProduct(true);
    setShowAllProducts(false);
    setShowWelcome(false);
  };
  const handleAllProducts = () => {
    setShowRegister(false);
    setShowLogin(false);
    setShowAddFirm(false);
    setShowAddProduct(false);
    setShowAllProducts(true);
    setShowWelcome(false);
  };

  const showWelcomePage = () => {
    setShowRegister(false);
    setShowLogin(false);
    setShowAddFirm(false);
    setShowAddProduct(false);
    setShowAllProducts(false);
    setShowWelcome(true);
  };

  const showlogouthandle = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("FirmId");
    localStorage.removeItem("FirmName");
    setToken(null);
    showWelcomePage();
  };

  return (
    <div className="dashboard">
      <Navbar
          handleRegister={handleRegister}
          handleLogin={handleLogin}
          showlogouthandle={showlogouthandle}
          firmtitle={firmtitle}
          showlogout={showlogout}
        />
      <div className="content-area">
        <Sidebar
          handleAddFirm={handleAddFirm}
          handleAddProduct={handleAddProduct}
          handleAllProducts={handleAllProducts}
          showWelcomePage={showWelcomePage}
        />
        <div className="main-content">
          {showregister && <Register handleLogin={handleLogin} />}
          {showlogin && <Login showWelcomePage={showWelcomePage} setToken={setToken} />}
          {showaddfirm && <AddFirm />}
          {showaddproduct && <AddProduct />}
          {showallproducts && <Allproducts />}
          {showwelcome && <Welcome />}
        </div>
      </div>
    </div>
  );
};

export default Mainpage;
