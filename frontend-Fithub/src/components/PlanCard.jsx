import React from "react";
import "../styles/HomePage.css"

export const PlanCard = ({title, price, info, description, isBasic, period})=>{
    return(
        <div className="card plan">
            <h3>
                {title}
            </h3>
            <h2>
                {price}€ {period}
            </h2>
            <p>
                {description}
            </p>
            <p><strong>Basic Feautures:</strong> {isBasic ? "✅" : "❌"}</p>
            <p>
                {info}
            </p>
            
        </div>
    )
}