import React from "react";

export default function ItemList({ items }) {
  if (!items.length) return <p className="empty-state">No items match the current filter.</p>;

  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {items.map(item => (
        <li key={item.id} className="item-card">
          <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
            <h4 style={{ margin: "0 0 8px", fontSize: "1.25rem" }}>{item.title}</h4>
            <span className="pill">${item.price?.toFixed(2) ?? "N/A"}</span>
          </div>

          {item.category && <span className="pill">{item.category}</span>}
          {item.state && <span className="pill">{item.state}</span>}

          <p style={{ color: "#5e4a3a", lineHeight: 1.6 }}>{item.description}</p>
          <p><strong>Seller:</strong> {item.seller?.name} ({item.seller?.email})</p>
          <p><strong>Location:</strong> {item.state}</p>

          {item.image_url && (
            <img src={item.image_url} alt={item.title} />
          )}
        </li>
      ))}
    </ul>
  );
}
