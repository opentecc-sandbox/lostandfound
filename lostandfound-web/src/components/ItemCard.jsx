import { px } from "framer-motion";
import { Maximize } from "lucide-react";
import React from "react"
const ItemCard = ({ item }) => {
    return(
        <>
        <div>
            <h3>{item.title}</h3>
            <p >{item.dateFoundLost ?new Date (item.dateFoundLost).toLocaleDateString() : "No date"}</p>
        </div>
        <div className="img">
            {item.photoUrl? (
                <img src={item.photoUrl}alt={item.title} />) :(
                    <img src="https://bihin.ginowan-impulse.com/wp-content/themes/ginowanimp_zaitko1.0/assets/img/no-photo.jpg"/>
                )
            }   
        </div>
        <div>
            <p>{item.location}</p>
            <p>{item.description || "No description"}</p>
        </div>
        <div>
            <button>Contact</button>
        </div>

    
    </>
    );
    
};

export default ItemCard ;