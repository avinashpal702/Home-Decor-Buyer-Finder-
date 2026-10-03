import React, { useState } from "react";
import axios from "axios";

export default function SellerForm() {
  const [seller, setSeller] = useState({ name: "", email: "" });
  const [item, setItem] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    state: "",
    image_url: "",
  });
  const [msg, setMsg] = useState("");

  const handleSellerChange = e =>
    setSeller({ ...seller, [e.target.name]: e.target.value });

  const handleItemChange = e =>
    setItem({ ...item, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    try {
      const sellerRes = await axios.post("/sellers", seller);
      const sellerId = sellerRes.data.id;
      await axios.post("/items", { ...item, seller_id: sellerId });
      setMsg("✅ Item posted successfully!");
    } catch (err) {
      console.error(err);
      setMsg("❌ Something went wrong.");
    }
  };

  return (
    <form onSubmit={submit} style={{ marginBottom: "1rem" }}>
      <h3 style={{ marginBottom: "12px", color: "#6f4535" }}>Seller details</h3>
      <input className="field" name="name" placeholder="Your name" required onChange={handleSellerChange} />
      <input className="field" name="email" placeholder="Your email" type="email" required onChange={handleSellerChange} />

      <h3 style={{ marginTop: "18px", marginBottom: "12px", color: "#6f4535" }}>Item details</h3>
      <input className="field" name="title" placeholder="Item title" required onChange={handleItemChange} />
      <textarea className="textarea" name="description" placeholder="Description" onChange={handleItemChange} />
      <input className="field" name="category" placeholder="Category (e.g. Pillow)" onChange={handleItemChange} />
      <input className="field" name="price" placeholder="Price (USD)" type="number" step="0.01" onChange={handleItemChange} />
      <input className="field" name="state" placeholder="State (e.g. California)" required onChange={handleItemChange} />
      <input className="field" name="image_url" placeholder="Image URL (optional)" onChange={handleItemChange} />

      <button className="button" type="submit">Post Item</button>
      <p className="status">{msg}</p>
    </form>
  );
}