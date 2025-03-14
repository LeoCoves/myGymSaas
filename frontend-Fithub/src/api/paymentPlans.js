const API_URL = "https://localhost:7216/api/plans";

export const getPaymentPlans = async () =>{

    try{
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if(!response.ok) throw new Error(response.statusText);

        return await response.json();
    }
    catch(error){
        console.error("Error");
        throw error;
    }
}