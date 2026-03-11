import React from "react";
import ItemList from "./components/ItemList.jsx"; 
import { BrowserRouter, Routes, Route } from "react-router-dom"

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