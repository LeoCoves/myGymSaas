import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createGymPlan } from "../../services/gymPaymentPlan.js";
import { useAuth } from "../../contexts/AuthContext.jsx";

const CreateGymPaymentPlan = () => {
    const { idGym, gymName } = useAuth();  // Obtener el ID del gimnasio desde el contexto
    const navigate = useNavigate();
    const [planData, setPlanData] = useState({
        Name: '',
        Description: '',
        Price: null,
        IsBasic: true,
        Features: ['Gestión administrativa Básica'],  // Array de características, por defecto tiene una característica inicial
        Period: 'Mensual',  // Valor inicial para period
        Duration: 1,
        IdGym: idGym,  // ID del gimnasio
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [newFeature, setNewFeature] = useState("");  // Estado para la nueva característica

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPlanData({
            ...planData,
            [name]: value,
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        
        
        // Validación de Price antes de enviarlo al backend
        const price = parseFloat(planData.Price);
        if (isNaN(price)) {
            setError("El precio debe ser un número válido.");
            setLoading(false);
            return;
        }
        
        // Asegúrate de que los nombres de las propiedades sean correctos según lo que espera el servidor
        const dataToSend = {
            Name: planData.Name,
            Period: planData.Period,
            Description: planData.Description,
            Price: price,
            IsBasic: planData.IsBasic,
            Features: planData.Features,
            Duration: planData.Duration,
            IdGym: idGym
        };
    
        try {
            // Usar la función `createPlan` para enviar los datos al servidor
            const response = await createGymPlan(dataToSend);
    
            // Verifica si la respuesta tiene un error
            if (!response || response.error) {
                throw new Error(response?.error || "Error al crear el plan de pago.");
            }
    
            // Si la creación es exitosa, redirigir al usuario a la página de lista de planes
            alert("Plan creado con éxito.");
            navigate(`/${gymName}/plans`);  // Redirigir a la lista de planes
        } catch (error) {
            console.error("Error creando el plan:", error);  // Ver detalles del error
            setError(error.message);  // Mostrar mensaje de error en el formulario
        } finally {
            setLoading(false);
        }
    };
    
    

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Crear Plan de Pago</h2>

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
                            className="px-4 py-2 rounded bg-neutral-900 text-white hover:bg-neutral-950"
                        >
                            Añadir
                        </button>
                    </div>
                    <ul className="mt-2">
                        {planData.Features.map((feature, index) => (
                            <li key={index} className="flex text-gray-600">
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
                        {loading ? "Creando..." : "Crear Plan"}
                    </button>
                    <Link to={`/${gymName}/plans`} className="ml-4 py-3 px-4 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700  hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500">
                        Cancelar
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default CreateGymPaymentPlan;

