import React from "react";
import ItemList from "./components/ItemList.jsx"; 
import { BrowserRouter, Routes, Route } from "react-router-dom"

const API_URL =import.meta.env.VITE_API_URL;
function App (){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ItemList />}/>
      </Routes>
    </BrowserRouter>
  )
}
export default App