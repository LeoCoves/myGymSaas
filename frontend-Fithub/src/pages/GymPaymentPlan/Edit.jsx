import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getPlanById, updateGymPlan } from "../../services/gymPaymentPlan.js"; // Importar los servicios
import { useAuth } from "../../contexts/AuthContext.jsx"; // Importar el contexto de autenticación

const EditGymPaymentPlan = () => {
    const { id } = useParams(); // Obtenemos el ID del plan de pago desde la URL
    const { gymName } = useAuth(); // Obtenemos el ID del gimnasio y el nombre del gimnasio desde el contexto
    const navigate = useNavigate();
    
    const [planData, setPlanData] = useState({
        Name: '',
        Description: '',
        Price: 0,
        IsBasic: true,
        Features: [],  // Asegurarse de que Features siempre sea un array
        Period: 'Mensual',
        Duration: 1
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [newFeature, setNewFeature] = useState("");

    useEffect(() => {
        const fetchPlanData = async () => {
            try {
                console.log("ID obtenido de useParams:", id);

                const data = await getPlanById(id);
                if (!data) {
                    throw new Error("No se encontraron datos para este plan.");
                }
    
                console.log("Datos obtenidos del servidor:", data);
    
                setPlanData({
                    idGymCustomPaymentPlan: id,
                    Name: data.name || '',  // 🔹 Convertimos name -> Name
                    Description: data.description || '',
                    Price: data.price || 0,
                    IsBasic: data.isBasic ?? true, 
                    Features: data.features || [],
                    Period: data.period || 'Mensual',
                    Duration: data.duration || 1
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
            IdGymCustomPaymentPlan: planData.IdGymCustomPaymentPlan || id,  // Aseguramos que tenga el ID correcto
            Name: planData.Name,
            Description: planData.Description,
            Price: parseFloat(planData.Price),
            IsBasic: planData.IsBasic,
            Features: planData.Features,
            Period: planData.Period,
            Duration: planData.Duration,
        };
    
    
        try {
            const response = await updateGymPlan(id, dataToSend);
    
            if (!response || response.error) {
                throw new Error(response?.error || "Error al editar el plan de pago.");
            }
    
            alert("Plan editado con éxito.");
            navigate("/admin-dashboard/plans");
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
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Editar Plan de Pago</h2>
            
            {error && <div className="text-red-500 text-center mb-4">{error}</div>}

            <form onSubmit={handleSubmit} className="text-left space-y-6">
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

                {/* Descripción */}
                <div>
                    <label htmlFor="Description" className="block text-sm font-medium text-gray-700">Descripción</label>
                    <input
                        id="Description" 
                        name="Description" 
                        value={planData.Description} 
                        onChange={handleChange} 
                        required 
                        rows="4" 
                        className="mt-1 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Describe los beneficios de este plan"
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

                {/* Features */}
                <div>
                    <label htmlFor="Features" className="block text-sm font-medium text-gray-700">Características</label>
                    <div className="flex space-x-4">
                        <input 
                            type="text" 
                            id="Features" 
                            value={newFeature} 
                            onChange={handleFeatureChange} 
                            className="mt-1 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                        {(planData.Features || []).map((feature, index) => (  // Aseguramos que Features sea un array
                            <li key={index} className="flex align-self-center text-gray-600 border-gray-300 border-b py-2">
                                <svg
                                    className="h-6 w-5 text-orange-600"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                    >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                    {feature}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveFeature(feature)} 
                                    className="text-red-500 hover:text-red-700 align-self-center"
                                >
                                    Eliminar
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex space-x-4">
                    {/* Duracion */}
                    <div className="flex-1">
                        <label htmlFor="Duration" className="block text-sm font-medium text-gray-700">Cantidad</label>
                        <input
                            type="number"
                            id="Duration" 
                            name="Duration" 
                            value={planData.Duration} 
                            onChange={handleChange} 
                            required 
                            className="mt-1 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="La cantidad de tiempo que dura el plan"
                        />
                    </div>
                    {/* Periodo */}
                    <div className="flex-1">
                        <label htmlFor="Period" className="block text-sm font-medium text-gray-700">Periodo</label>
                        <select 
                            id="Period" 
                            name="Period" 
                            value={planData.Period} 
                            onChange={handleChange} 
                            className="mt-1 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="Semanal">Semana</option>
                            <option value="Diario">Día</option>
                            <option value="Mensual">Mes</option>
                            <option value="Anual">Año</option>
                        </select>
                    </div>
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
                    <Link to={`/${gymName}/plans`} className="ml-4 py-3 px-4 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500">
                        Cancelar
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default EditGymPaymentPlan;
