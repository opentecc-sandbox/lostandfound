import React,{useEffect, useState} from "react";
import api from "../api/api"
import ItemCard from "./ItemCard";
const ItemList = () => {
  const [items,setItems]=useState([])

  useEffect(()=>{
    const fetchItems =async () =>{
      try{
        const res= await api.get("/items");
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

