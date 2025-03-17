import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getGymById, updateGym } from "../../services/gyms.js"; // Funciones externas

const EditGym = () => {
    const { id } = useParams(); // Obtiene el ID desde la URL
    const navigate = useNavigate();

    const [gymData, setGymData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Cargar datos del gimnasio al montar el componente
    useEffect(() => {
        const loadGymData = async () => {
            try {
                const data = await getGymById(id); // Obtiene datos de la API
                setGymData(data); // Guarda en el estado
            } catch (error) {
                setError("Error al obtener el gimnasio");
            } finally {
                setLoading(false);
            }
        };

        loadGymData();
    }, [id]);

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setGymData((prevState) => ({
            ...prevState,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    // Enviar actualización a la API
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateGym(id, gymData); // Llama a la API externa
            alert("Gimnasio actualizado con éxito");
            navigate("/gyms"); // Redirige a la lista de gimnasios
        } catch (error) {
            error = "Error actualizando el gimnasio";
            console.error(error);
        }
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Editar Gimnasio</h1>

            <div className="space-y-6">
                {/* Nombre */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={gymData.name} 
                        onChange={handleChange} 
                        required 
                        className="mt-1 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
                        placeholder="Introduce el nombre del gimnasio"
                    />
                </div>

                {/* Descripción */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
                    <textarea 
                        id="description" 
                        name="description" 
                        value={gymData.description} 
                        onChange={handleChange} 
                        required 
                        rows="4"
                        className="mt-1 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
                        placeholder="Añade una descripción breve del gimnasio"
                    />
                </div>

                {/* Dirección */}
                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Dirección</label>
                    <input 
                        type="text" 
                        id="address" 
                        name="address" 
                        value={gymData.address} 
                        onChange={handleChange} 
                        required 
                        className="mt-1 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
                        placeholder="Introduce la dirección del gimnasio"
                    />
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={gymData.email} 
                        onChange={handleChange} 
                        required 
                        className="mt-1 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
                        placeholder="ejemplo@gimnasio.com"
                    />
                </div>

                {/* Teléfono */}
                <div>
                    <label htmlFor="numberPhone" className="block text-sm font-medium text-gray-700">Teléfono</label>
                    <input 
                        type="text" 
                        id="numberPhone" 
                        name="numberPhone" 
                        value={gymData.numberPhone} 
                        onChange={handleChange} 
                        required 
                        className="mt-1 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
                        placeholder="Introduce el número de teléfono"
                    />
                </div>

                {/* Estado */}
                <div className="flex items-center space-x-3">
                    <label htmlFor="isActive" className="text-sm font-medium text-gray-700">Activo</label>
                    <input 
                        type="checkbox" 
                        id="isActive" 
                        name="isActive" 
                        checked={gymData.isActive} 
                        onChange={handleChange} 
                        className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                </div>

                {/* Plan de Pago */}
                <div>
                    <label htmlFor="idPaymentPlan" className="block text-sm font-medium text-gray-700">Plan de Pago (ID)</label>
                    <input 
                        type="number" 
                        id="idPaymentPlan" 
                        name="idPaymentPlan" 
                        value={gymData.idPaymentPlan} 
                        onChange={handleChange} 
                        required 
                        className="mt-1 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
                        placeholder="Introduce el ID del plan de pago"
                    />
                </div>

                {/* Botón de Enviar */}
                <div className="flex justify-center gap-2">
                    <button 
                        type="submit" 
                        className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Guardar Cambios
                    </button>
                    <button onClick={() => navigate("/admin-dashboard/gyms")}>Cancelar</button>
                </div>
            </div>
        </form>
            
        </div>
    );
};

export default EditGym;
