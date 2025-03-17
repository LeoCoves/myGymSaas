import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatePaymentPlan = () => {
    const navigate = useNavigate();
    const [planData, setPlanData] = useState({
        name: "",
        price: "",
        duration: "",
        description: "",
        isActive: true
    });
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setPlanData({
            ...planData,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // Aquí iría la lógica para enviar los datos a la API (por ejemplo, un POST)
            const response = await fetch("/api/payment-plans", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(planData),
            });

            if (!response.ok) throw new Error("Error al crear el plan de pago.");

            // Si la creación es exitosa, redirigir al usuario a la página de lista de planes
            alert("Plan creado con éxito.");
            navigate("/admin-dashboard/plans"); // Ruta de la lista de planes de pago
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Crear Plan de Pago</h2>
            
            {error && <div className="text-red-500 text-center mb-4">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nombre del Plan */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre del Plan</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={planData.name} 
                        onChange={handleChange} 
                        required 
                        className="mt-1 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Ejemplo: Plan Básico"
                    />
                </div>

                {/* Precio */}
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Precio</label>
                    <input 
                        type="number" 
                        id="price" 
                        name="price" 
                        value={planData.price} 
                        onChange={handleChange} 
                        required 
                        className="mt-1 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Ejemplo: 19.99"
                    />
                </div>

                {/* Duración */}
                <div>
                    <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duración (meses)</label>
                    <input 
                        type="number" 
                        id="duration" 
                        name="duration" 
                        value={planData.duration} 
                        onChange={handleChange} 
                        required 
                        className="mt-1 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Ejemplo: 12"
                    />
                </div>

                {/* Descripción */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
                    <textarea 
                        id="description" 
                        name="description" 
                        value={planData.description} 
                        onChange={handleChange} 
                        required 
                        rows="4" 
                        className="mt-1 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Describe los beneficios de este plan"
                    />
                </div>

                {/* Activo/Inactivo */}
                <div className="flex items-center space-x-3">
                    <label htmlFor="isActive" className="text-sm font-medium text-gray-700">Activo</label>
                    <input 
                        type="checkbox" 
                        id="isActive" 
                        name="isActive" 
                        checked={planData.isActive} 
                        onChange={handleChange} 
                        className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                </div>

                {/* Botón de Enviar */}
                <div className="flex justify-center">
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {loading ? "Creando..." : "Crear Plan"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreatePaymentPlan;
