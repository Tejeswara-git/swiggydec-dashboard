import React, { useEffect } from "react";
import { useState } from "react";
import { API_Path } from "../Helpers/data";

const Allproducts = () => {
  const [products, setProducts] = useState([]);
  const firmId = localStorage.getItem("FirmId");

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await fetch(
          `${API_Path}/product/getallproducts/${firmId}`
        );
        const data = await response.json();
        setProducts(data.products || []);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, []);

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(
          `${API_Path}/product/deleteproduct/${productId}`,
          {
            method: "DELETE",
          }
        );
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          setProducts(products.filter((item) => item._id !== productId));
          alert("Product deleted successfully");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <table
          className="product-table"
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
            fontSize: "16px",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "15px",
                  textAlign: "left",
                }}
              >
                Product Name
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                Price
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                Description
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                Bestseller
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                Image
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item._id}>
                <td style={{ border: "1px solid #ddd", padding: "15px" }}>
                  {item.ProductName}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "15px" }}>
                  {item.Price}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "15px" }}>
                  {item.Description}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "15px" }}>
                  {item.BestSeller ? "Yes" : "No"}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "15px" }}>
                  {item.Image && (
                    <img
                      src={`${API_Path}/uploads/${item.Image.split("/").pop()}`}
                      alt={item.ProductName}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                    />
                  )}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "15px" }}>
                  <button
                    onClick={() => handleDelete(item._id)}
                    style={{
                      backgroundColor: "#dc3545",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      cursor: "pointer",
                      borderRadius: "3px",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Allproducts;
