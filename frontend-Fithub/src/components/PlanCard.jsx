import React from "react";
import "../styles/HomePage.css"

export const PlanCard = ({title, price, info, duration, currency})=>{
    return(
        <div className="card plan">
            <h3>
                {title}
            </h3>
            <h2>
                {price} {currency}
            </h2>
            <p>
                {info}
            </p>
            <p>
                {duration}
            </p>
        </div>
    )
}