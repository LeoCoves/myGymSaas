import React from "react";
import { useState, useEffect } from "react";
import { PlanCard } from "./PlanCard";
import "../styles/HomePage.css"
import { getPaymentPlans } from "../services/paymentPlans.js";

export const PaymentPlan = () => {

    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const fetchPlans = async () => {
            try {
              const data = await getPaymentPlans();
              console.log(data)
              setPlans(data);
            } catch (error) {
              setError(error.message);
            } finally {
              setLoading(false);
            }
        };

        fetchPlans();
    }, [])
    
    if (loading) return <p>Cargando planes de pago...</p>;
    if (error) return <p>Error: {error}</p>;

    return(
        <>
        <h2>Payment Plan</h2>
        <p>
            Get fast, reliable user testing that won't blow up your budget
        </p>
            <div className="payment-plan">
                {
                    
                    plans.map((plan, index) => {
                        return(
                            <PlanCard
                            key={index}
                            title={plan.name}
                            description={plan.description}
                            price={plan.price}
                            info={plan.features}
                            currency={plan.type}
                        />
                        )
                    })
                }

                <PlanCard/>
            </div>
        </>
    )
}