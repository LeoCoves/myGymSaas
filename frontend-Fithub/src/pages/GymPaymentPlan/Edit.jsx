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
        StartDate: '',
        EndDate: ''
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
                    StartDate: data.startDate || null,
                    EndDate: data.endDate || null
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
            StartDate: planData.StartDate,
            EndDate: planData.EndDate
        };
    
        console.log("Datos enviados:", dataToSend); // Verifica si el ID aparece correctamente
    
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

            <form onSubmit={handleSubmit} className="space-y-6">
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



                {/* Tipo de Plan (isBasic) */}
                <div>
                    <label htmlFor="IsBasic" className="block text-sm font-medium text-gray-700">Es Plan Básico</label>
                    <input 
                        type="checkbox" 
                        id="IsBasic" 
                        name="IsBasic" 
                        checked={planData.IsBasic} 
                        onChange={handleChange} 
                        className="mt-1"
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

                <div>
                    <label htmlFor="Period" className="block text-sm font-medium text-gray-700">Period</label>
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

                {/* Fechas */}
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

                {/* Botón de Enviar */}
                <div className="flex justify-center">
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {loading ? "Actualizando..." : "Actualizar Plan"}
                    </button>
                    <Link to={`/${gymName}/plans`} className="ml-4 py-3 px-4 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500">
                        Cancelar
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default EditGymPaymentPlan;
