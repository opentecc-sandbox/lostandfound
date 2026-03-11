import React, { useEffect, useState } from "react";
import axios from "axios";

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/items");
        setItems(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchItems();
  }, []);

  return (
    <div>
      <h2>Lost & Found Items</h2>
      {items.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <h3>{item.title} ({item.status})</h3>
              <p>{item.description}</p>
              <p>Category: {item.category} | Location: {item.location}</p>
              <p>Date: {item.date_found_lost}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ItemList;