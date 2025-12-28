import React from "react";
import { useState } from "react";
import { API_Path } from "../Helpers/data";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState([]);
  const [description, setDescription] = useState("");
  const [bestSeller, setBestSeller] = useState(false);
  const [image, setImage] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  const handleBestSeller = (e) => {
    const value = e.target.value === "true" ? true : false;
    setBestSeller(value);
  };
  const handleCategory = (e) => {
    const value = e.target.value;

    if (category.includes(value)) {
      setCategory(category.filter((c) => c !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const firmId = localStorage.getItem("FirmId");
    if (!firmId) {
      alert("Please add a firm first");
      return;
    }

    const formData = new FormData();
    formData.append("ProductName", productName);
    formData.append("Price", price);
    category.forEach((item) => {
      formData.append("Category", item);
    });

    formData.append("Description", description);
    formData.append("BestSeller", bestSeller);
    formData.append("image", image);

    const logintoken = localStorage.getItem("token");

    try {
      const response = await fetch(`${API_Path}/product/addproduct/${firmId}`, {
        method: "POST",
        headers: {
          token: logintoken,
        },
        body: formData,
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        alert("Product added successfully");
        setProductName("");
        setPrice("");
        setCategory([]);
        setDescription("");
        setBestSeller(false);
        setImage(null);
        document.getElementById("productImageInput").value = "";
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f8ff",
        padding: "20px",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#ffffff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "500px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <h2
          style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}
        >
          Add Product
        </h2>
        <label style={{ fontWeight: "bold", color: "#555" }}>
          Product Name
        </label>
        <input
          type="text"
          placeholder="Product Name"
          onChange={(e) => setProductName(e.target.value)}
          value={productName}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            fontSize: "16px",
          }}
        />
        <label style={{ fontWeight: "bold", color: "#555" }}>Price</label>
        <input
          type="text"
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            fontSize: "16px",
          }}
        />

        <label style={{ fontWeight: "bold", color: "#555" }}>Category</label>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <label style={{ color: "#555" }}>VEG</label>
          <input
            type="checkbox"
            value="veg"
            checked={category.includes("veg")}
            onChange={handleCategory}
          />

          <label style={{ color: "#555" }}>NON-VEG</label>
          <input
            type="checkbox"
            value="nonveg"
            checked={category.includes("nonveg")}
            onChange={handleCategory}
          />
        </div>

        <label style={{ fontWeight: "bold", color: "#555" }}>Description</label>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            fontSize: "16px",
          }}
        />

        <label style={{ fontWeight: "bold", color: "#555" }}>Best Seller</label>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <label style={{ color: "#555" }}>Yes</label>
          <input
            type="radio"
            checked={bestSeller === true}
            onChange={handleBestSeller}
            value="true"
          />
          <label style={{ color: "#555" }}>No</label>
          <input
            type="radio"
            checked={bestSeller === false}
            onChange={handleBestSeller}
            value="false"
          />
        </div>

        <label style={{ fontWeight: "bold", color: "#555" }}>Image</label>
        <input
          type="file"
          id="productImageInput"
          onChange={handleImage}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "12px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
