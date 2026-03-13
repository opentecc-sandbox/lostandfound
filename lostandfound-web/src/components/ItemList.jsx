import React,{useEffect, useState} from "react";
import axios from "axios";
import ItemCard from "./ItemCard";
const ItemList = () => {
  const [items,setItems]=useState([])

  useEffect(()=>{
    const fetchItems =async () =>{
      try{
        const res= await axios.get("http://localhost:5000/api/items");
        setItems(res.data);
      }catch(err) {
        console.error("Failed to fetch items:", err);
      }
    }
    fetchItems();
  },[]);


  return(
  <div>
    {items.length === 0 ? (
      <p>No items found .</p>
    ) : (
      <div>
        {items.map ((item) => (
          <ItemCard key={item.id} item={item}/>
        ))}
      </div>
    )}
  </div>
    
  );
};
export default ItemList ;

