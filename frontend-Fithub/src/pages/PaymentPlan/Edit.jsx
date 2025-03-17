import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPlanById, updatePlan } from "../../services/paymentPlans.js"; // Importar los servicios

const EditPaymentPlan = () => {
    const { id } = useParams(); // Obtenemos el ID del plan de pago desde la URL
    const navigate = useNavigate();
    
    const [planData, setPlanData] = useState({
        name: "",
        price: "",
        description: "",
        isBasic: false,
        features: [""], // Es un array, inicializamos con un valor vacío
        currency: "Mensual",
        startDate: "",
        endDate: "",
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Cargar los detalles del plan de pago
    useEffect(() => {
        const fetchPlanData = async () => {
            try {
                const data = await getPlanById(id); // Obtener los detalles del plan
                setPlanData(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPlanData();
    }, [id]);

    // Manejar cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setPlanData({
            ...planData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const updatedPlan = await updatePlan(id, planData); // Llamada a la API para actualizar el plan
            alert("Plan actualizado con éxito.");
            navigate("/admin-dashboard/plans"); // Redirigir al listado de planes de pago
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Cargando...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Editar Plan de Pago</h2>
            
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


                {/* Tipo de Plan (isBasic) */}
                <div>
                    <label htmlFor="isBasic" className="block text-sm font-medium text-gray-700">Es Plan Básico</label>
                    <input 
                        type="checkbox" 
                        id="isBasic" 
                        name="isBasic" 
                        checked={planData.isBasic} 
                        onChange={handleChange} 
                        className="mt-1"
                    />
                </div>

                {/* Características */}
                <div>
                    <label htmlFor="features" className="block text-sm font-medium text-gray-700">Características</label>
                    <textarea 
                        id="features" 
                        name="features" 
                        value={planData.features.join(", ")} 
                        onChange={(e) => {
                            const newFeatures = e.target.value.split(",").map(feature => feature.trim());
                            setPlanData({ ...planData, features: newFeatures });
                        }} 
                        rows="3"
                        className="mt-1 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Característica 1, Característica 2, ..."
                    />
                </div>

                {/* Moneda */}
                <div>
                    <label htmlFor="currancy" className="block text-sm font-medium text-gray-700">Moneda</label>
                    <select 
                        id="currancy" 
                        name="currancy" 
                        value={planData.currancy} 
                        onChange={handleChange} 
                        required 
                        className="mt-1 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                         <option value="Semanal">Semanal</option>
                        <option value="Mensual">Mensual</option>
                        <option value="Anual">Anual</option>
                    </select>
                </div>

                {/* Fechas */}
                <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Fecha de Inicio</label>
                    <input 
                        type="date" 
                        id="startDate" 
                        name="startDate" 
                        value={planData.startDate} 
                        onChange={handleChange} 
                        className="mt-1 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">Fecha de Fin</label>
                    <input 
                        type="date" 
                        id="endDate" 
                        name="endDate" 
                        value={planData.endDate} 
                        onChange={handleChange} 
                        className="mt-1 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                {/* Botón de Enviar */}
                <div className="flex justify-center">
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {loading ? "Actualizando..." : "Actualizar Plan"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditPaymentPlan;
