import React from "react";
import { PlanCard } from "./PlanCard";
import "../styles/HomePage.css"

export const PaymentPlan = () => {
    return(
        <>
        <h2>Payment Plan</h2>
        <p>
            Get fast, reliable user testing that won't blow up your budget
        </p>
            <div className="payment-plan">
                <PlanCard
                    title="DEMO"
                    price="44"
                    info="Si"
                    duration="Hasta 5 usuarios"
                    currency="Mensual"
                />

                <PlanCard
                    title="DEMO"
                    price="44"
                    info="Si"
                    duration="Hasta 5 usuarios"
                    currency="Mensual"
                />

                <PlanCard
                    title="DEMO"
                    price="44"
                    info="Si"
                    duration="Hasta 5 usuarios"
                    currency="Mensual"
                />
            </div>
        </>
    )
}