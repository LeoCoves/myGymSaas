import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPlanById, updatePlan } from "../../services/paymentPlans.js"; // Importar los servicios
import { Link } from "react-router-dom"; // Importar Link para la navegación

const EditPaymentPlan = () => {
    const { id } = useParams(); // Obtenemos el ID del plan de pago desde la URL
    const navigate = useNavigate();
    
    const [planData, setPlanData] = useState({
        Name: '',
        Description: '',
        Price: 0,
        IsBasic: true,
        Features: [],  // Asegurarse de que Features siempre sea un array
        Period: 'Mensual',
        StartDate: '',
        EndDate: '',
        Gyms: []
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [newFeature, setNewFeature] = useState("");

    useEffect(() => {
        const fetchPlanData = async () => {
            try {

                const data = await getPlanById(id);
                if (!data) {
                    throw new Error("No se encontraron datos para este plan.");
                }
    
                console.log("Datos obtenidos del servidor:", data);
    
                setPlanData({
                    idPaymentPlan: id,
                    Name: data.name || '',  // 🔹 Convertimos name -> Name
                    Description: data.description || '',
                    Price: data.price || 0,
                    IsBasic: data.isBasic ?? true, 
                    Features: data.features || [],
                    Period: data.period || 'Mensual',
                    StartDate: data.startDate || null,
                    EndDate: data.endDate || null,
                    Gyms: data.gyms || []
                });
    
            } catch (error) {
                console.error("Error obteniendo el plan:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
    
        fetchPlanData();
    }, [id]);
    
    
    

     // Manejar cambios en el formulario
     const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setPlanData({
            ...planData,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleFeatureChange = (e) => {
        setNewFeature(e.target.value);  // Actualiza el estado de la nueva característica
    };

    const handleAddFeature = () => {
        if (newFeature.trim() !== "") {
            setPlanData({
                ...planData,
                Features: [...planData.Features, newFeature.trim()]  // Agrega la nueva característica al array
            });
            setNewFeature("");  // Limpiar el campo después de agregar la característica
        }
    };

    const handleRemoveFeature = (feature) => {
        setPlanData({
            ...planData,
            Features: planData.Features.filter((f) => f !== feature)
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
    
        const dataToSend = {
            IdPaymentPlan: planData.IdPaymentPlan || id,  // Aseguramos que tenga el ID correcto
            Name: planData.Name,
            Description: planData.Description,
            Price: parseFloat(planData.Price),
            IsBasic: planData.IsBasic,
            Features: planData.Features,
            Period: planData.Period,
            StartDate: planData.StartDate,
            EndDate: planData.EndDate
        };
    
        console.log("Datos enviados:", dataToSend); // Verifica si el ID aparece correctamente
    
        try {
            const response = await updatePlan(id, dataToSend);
    
            if (!response || response.error) {
                throw new Error(response?.error || "Error al editar el plan de pago.");
            }
    
            navigate("/admin/plans");
        } catch (error) {
            console.error("Error editando el plan:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Cargando...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-xl">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Editar Plan de Pago</h2>
            
            

        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nombre del Plan */}
            <div>
                <label htmlFor="Name" className="block text-sm font-medium text-gray-700">Nombre del Plan</label>
                <input
                type="text"
                id="Name"
                name="Name"
                value={planData.Name}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ejemplo: Plan Básico"
                />
            </div>

            {/* Precio */}
            <div>
                <label htmlFor="Price" className="block text-sm font-medium text-gray-700">Precio</label>
                <input
                type="number"
                id="Price"
                name="Price"
                value={planData.Price}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ejemplo: 19.99"
                />
            </div>

            {/* Descripción */}
            <div className="md:col-span-2">
            <label htmlFor="Description" className="block text-sm font-medium text-gray-700">Descripción</label>
            <input
                id="Description"
                name="Description"
                value={planData.Description}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe los beneficios de este plan"
            />
            </div>


            

            {/* Tipo de Plan (isBasic) */}
            <div className="flex items-center mt-6">
                <input
                type="checkbox"
                id="IsBasic"
                name="IsBasic"
                checked={planData.IsBasic}
                onChange={handleChange}
                className="mr-2"
                />
                <label htmlFor="IsBasic" className="text-sm font-medium text-gray-700">Es Plan Básico</label>
            </div>

            {/* Moneda */}
            <div>
                <label htmlFor="Period" className="block text-sm font-medium text-gray-700">Periodo</label>
                <select
                id="Period"
                name="Period"
                value={planData.Period}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                <option value="Semanal">Semanal</option>
                <option value="Mensual">Mensual</option>
                <option value="Anual">Anual</option>
                </select>
            </div>

            {/* Fecha de Inicio */}
            <div>
                <label htmlFor="StartDate" className="block text-sm font-medium text-gray-700">Fecha de Inicio</label>
                <input
                type="date"
                id="StartDate"
                name="StartDate"
                value={planData.StartDate}
                onChange={handleChange}
                className="mt-1 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>

            {/* Fecha de Fin */}
            <div>
                <label htmlFor="EndDate" className="block text-sm font-medium text-gray-700">Fecha de Fin</label>
                <input
                type="date"
                id="EndDate"
                name="EndDate"
                value={planData.EndDate}
                onChange={handleChange}
                className="mt-1 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>

            {/* Features (ocupa ambas columnas) */}
            <div className="md:col-span-2">
                <label htmlFor="Features" className="block text-sm font-medium text-gray-700">Características</label>
                <div className="flex space-x-4 mt-1">
                <input
                    type="text"
                    id="Features"
                    value={newFeature}
                    onChange={handleFeatureChange}
                    className="w-full p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ejemplo: Característica 1"
                />
                <button
                    type="button"
                    onClick={handleAddFeature}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Añadir
                </button>
                </div>
                <ul className="mt-2">
                {(planData.Features || []).map((feature, index) => (
                    <li key={index} className="flex justify-between text-gray-600">
                    <span>{feature}</span>
                    <button
                        type="button"
                        onClick={() => handleRemoveFeature(feature)}
                        className="text-red-500 hover:text-red-700"
                    >
                        Eliminar
                    </button>
                    </li>
                ))}
                </ul>
            </div>

            {/* Error */}
            {error && (
                <div className="md:col-span-2 text-red-500 text-center">{error}</div>
            )}

            {/* Botones */}
            <div className="md:col-span-2 flex justify-center space-x-4">
                <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto py-3 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                {loading ? "Actualizando..." : "Actualizar Plan"}
                </button>
                <Link
                to={`/admin/plans`}
                className="py-3 px-6 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                Cancelar
                </Link>
            </div>
            </form>

        </div>
    );
};

export default EditPaymentPlan;
