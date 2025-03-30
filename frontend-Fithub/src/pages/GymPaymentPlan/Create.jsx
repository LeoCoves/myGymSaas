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
        Price: 0,
        IsBasic: true,
        Features: ['Gestión administrativa Básica'],  // Array de características, por defecto tiene una característica inicial
        Period: 'Mensual',  // Valor inicial para currency
        StartDate: null,  // Asignar una fecha de inicio válida
        EndDate: null,  // Asignar una fecha de fin válida
        GymId: idGym,  // ID del gimnasio
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
        
        // Asegúrate de que los datos se están enviando correctamente
        console.log("Datos que se enviarán:", planData);
        
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
            StartDate: planData.StartDate,
            EndDate: planData.EndDate,
            GymId: idGym
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
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Añadir
                        </button>
                    </div>
                    <ul className="mt-2">
                        {planData.Features.map((feature, index) => (
                            <li key={index} className="text-gray-600">{feature}</li>
                        ))}
                    </ul>
                </div>

                {/* Periodo */}
                <div>
                    <label htmlFor="Period" className="block text-sm font-medium text-gray-700">Period</label>
                    <select 
                        id="Period" 
                        name="Period" 
                        value={planData.Period} 
                        onChange={handleChange} 
                        className="mt-1 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="Diario">Diario</option>
                        <option value="Mensual">Mensual</option>
                        <option value="Semanal">Semanal</option>
                        <option value="Trimestral">Trimestral</option>
                        <option value="Anual">Anual</option>
                        
                    </select>
                </div>

                {/* Fecha de inicio */}
                <div>
                    <label htmlFor="StartDate" className="block text-sm font-medium text-gray-700">Fecha de inicio</label>
                    <input 
                        type="date" 
                        id="StartDate" 
                        name="StartDate" 
                        value={planData.StartDate} // Formato de fecha para input
                        onChange={handleChange}
                        className="mt-1 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                {/* Fecha de fin */}
                <div>
                    <label htmlFor="EndDate" className="block text-sm font-medium text-gray-700">Fecha de fin</label>
                    <input 
                        type="date" 
                        id="EndDate" 
                        name="EndDate" 
                        value={planData.EndDate} // Formato de fecha para input
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
                        {loading ? "Creando..." : "Crear Plan"}
                    </button>
                    <Link to={`${gymName}/plans`} className="ml-4 py-3 px-4 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500">
                        Cancelar
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default CreateGymPaymentPlan;

