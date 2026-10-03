import React, { useState } from "react";
import axios from "axios";

export default function BuyerRequestForm() {
  const [form, setForm] = useState({ item_id: "", buyer_name: "", buyer_email: "" });
  const [msg, setMsg] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    try {
      await axios.post("/match", form);
      setMsg("✅ Request sent – you’ll receive an email shortly.");
    } catch (err) {
      console.error(err);
      setMsg("❌ Failed to send request.");
    }
  };

  return (
    <form onSubmit={submit}>
      <input className="field" name="item_id" placeholder="Item ID (from list)" required onChange={handleChange} />
      <input className="field" name="buyer_name" placeholder="Your name" required onChange={handleChange} />
      <input className="field" name="buyer_email" placeholder="Your email" type="email" required onChange={handleChange} />
      <button className="button" type="submit">Request Contact</button>
      <p className="status">{msg}</p>
    </form>
  );
}
