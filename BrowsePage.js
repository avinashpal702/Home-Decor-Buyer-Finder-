import React, { useEffect, useState } from "react";
import axios from "axios";
import ItemList from "../components/itemList";

export default function BrowsePage() {
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({ keyword: "", state: "", category: "" });

  useEffect(() => {
    const qs = new URLSearchParams(filters).toString();
    axios.get(`/items?${qs}`).then(res => setItems(res.data));
  }, [filters]);

  return (
    <section className="panel page-panel">
      <h2>Browse Items</h2>
      <div className="filter-row">
        <input
          className="field"
          placeholder="Keyword"
          value={filters.keyword}
          onChange={e => setFilters({ ...filters, keyword: e.target.value })}
        />
        <input
          className="field"
          placeholder="State (e.g. Texas)"
          value={filters.state}
          onChange={e => setFilters({ ...filters, state: e.target.value })}
        />
        <input
          className="field"
          placeholder="Category"
          value={filters.category}
          onChange={e => setFilters({ ...filters, category: e.target.value })}
        />
      </div>
      <ItemList items={items} />
    </section>
  );
}
