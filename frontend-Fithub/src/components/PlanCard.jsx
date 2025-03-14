import React from "react";
import "../styles/HomePage.css"

export const PlanCard = ({title, price, info, description, currency})=>{
    return(
        <div className="card plan">
            <h3>
                {title}
            </h3>
            <h2>
                {price}€ {currency}
            </h2>
            <p>
                {description}
            </p>
            <p>
                {info}
            </p>
            
        </div>
    )
}