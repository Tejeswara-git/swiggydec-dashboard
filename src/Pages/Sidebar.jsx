import React from "react";

const Sidebar = ({
  handleAddFirm,
  handleAddProduct,
  handleAllProducts,
  showWelcomePage,
}) => {
  return (
    <div className="sidebar">
      <button onClick={showWelcomePage}>Home</button>
      <button onClick={handleAddFirm}>Add Firm</button>
      <button onClick={handleAddProduct}>Add Product</button>
      <button onClick={handleAllProducts}>All Products</button>
    </div>
  );
};

export default Sidebar;
