import React, { useState, useRef } from "react";
import { API_Path } from "../Helpers/data";

const AddFirm = () => {
  const [FirmName, setFirmName] = useState("");
  const [Area, setArea] = useState("");
  const [Category, setCategory] = useState([]);
  const [Region, setRegion] = useState([]);
  const [Image, setImage] = useState(null);
  const [offer, setOffer] = useState("");
  const imageInputRef = useRef(null);

  const handlecategory = (e) => {
    const category = e.target.value;
    if (Category.includes(category)) {
      setCategory(Category.filter((c) => c !== category));
    } else {
      setCategory([...Category, category]);
    }
  };

  const handleRegion = (e) => {
    const region = e.target.value;
    if (Region.includes(region)) {
      setRegion(Region.filter((c) => c !== region));
    } else {
      setRegion([...Region, region]);
    }
  };

  const handleImagechange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const logintoken = localStorage.getItem("token");
    if (!logintoken) {
      alert("Please login first");
      return;
    }

    const formData = new FormData();
    formData.append("FirmName", FirmName);
    formData.append("Area", Area);

    Category.forEach((category) => {
      formData.append("Category", category);
    });
    Region.forEach((region) => {
      formData.append("Region", region);
    });

    formData.append("image", Image);
    formData.append("offer", offer);

    try {
      const response = await fetch(`${API_Path}/firm/addfirm`, {
        method: "POST",
        headers: {
          token: logintoken,
        },
        body: formData,
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        alert("Firm added successfully");
        setFirmName("");
        setArea("");
        setCategory([]);
        setRegion([]);
        setImage(null);
        if (imageInputRef.current) {
          imageInputRef.current.value = null;
        }
        setOffer("");
        localStorage.setItem("FirmId", data.FirmId);
        localStorage.setItem("FirmName", data.FirmName);
      } else {
        alert(data.message || "Error adding firm");
      }
    } catch (error) {
      console.error(error);
      alert("Network error occurred");
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
          Add Firm
        </h2>
        <label style={{ fontWeight: "bold", color: "#555" }}>FirmName</label>
        <input
          type="text"
          placeholder="FirmName"
          value={FirmName}
          onChange={(e) => setFirmName(e.target.value)}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            fontSize: "16px",
          }}
        />
        <label style={{ fontWeight: "bold", color: "#555" }}>Area</label>
        <input
          type="text"
          placeholder="Area"
          value={Area}
          onChange={(e) => setArea(e.target.value)}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            fontSize: "16px",
          }}
        />
        <label style={{ fontWeight: "bold", color: "#555" }}>Category</label>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <label style={{ color: "#555" }}>Veg</label>
          <input
            type="checkbox"
            value="veg"
            checked={Category.includes("veg")}
            onChange={handlecategory}
          />
          <label style={{ color: "#555" }}>Non-Veg</label>
          <input
            type="checkbox"
            value="non-veg"
            checked={Category.includes("non-veg")}
            onChange={handlecategory}
          />
        </div>
        <label style={{ fontWeight: "bold", color: "#555" }}>Region</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <label style={{ color: "#555" }}>North-Indian</label>
            <input
              type="checkbox"
              value="north-indian"
              checked={Region.includes("north-indian")}
              onChange={handleRegion}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <label style={{ color: "#555" }}>South-Indian</label>
            <input
              type="checkbox"
              value="south-indian"
              checked={Region.includes("south-indian")}
              onChange={handleRegion}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <label style={{ color: "#555" }}>Chinese</label>
            <input
              type="checkbox"
              value="chinese"
              checked={Region.includes("chinese")}
              onChange={handleRegion}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <label style={{ color: "#555" }}>Bakery</label>
            <input
              type="checkbox"
              value="bakery"
              checked={Region.includes("bakery")}
              onChange={handleRegion}
            />
          </div>
        </div>
        <label style={{ fontWeight: "bold", color: "#555" }}>Image</label>
        <input
          ref={imageInputRef}
          type="file"
          onChange={handleImagechange}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        <label style={{ fontWeight: "bold", color: "#555" }}>Offer</label>
        <input
          type="text"
          placeholder="Offer"
          value={offer}
          onChange={(e) => setOffer(e.target.value)}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            fontSize: "16px",
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
          ADD FIRM
        </button>
      </form>
    </div>
  );
};

export default AddFirm;