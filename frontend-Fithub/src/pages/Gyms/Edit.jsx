import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getGymById, updateGym } from "../../services/gyms.js"; // Funciones externas

const EditGym = () => {
    const { id } = useParams(); // Obtiene el ID desde la URL
    const navigate = useNavigate();

    const [gymData, setGymData] = useState({
        name: "",
        description: "",
        address: "",
        email: "",
        numberPhone: "",
        isActive: false,
        idPaymentPlan: ""
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadGymData = async () => {
            try {
                const data = await getGymById(id);
                if (!data) throw new Error("No se encontró el gimnasio");
                setGymData(data);
            } catch (error) {
                setError(error.message || "Error al obtener el gimnasio");
            } finally {
                setLoading(false);
            }
        };
        loadGymData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setGymData((prevState) => ({
            ...prevState,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await updateGym(id, gymData);
            alert("Gimnasio actualizado con éxito");
            navigate("/admin-dashboard/gyms");
        } catch (error) {
            setError("Error actualizando el gimnasio");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Editar Gimnasio</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input type="text" name="name" value={gymData.name} onChange={handleChange} required className="input-field" placeholder="Nombre del gimnasio" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Descripción</label>
                    <textarea name="description" value={gymData.description} onChange={handleChange} required className="input-field" placeholder="Descripción" rows="4" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Dirección</label>
                    <input type="text" name="address" value={gymData.address} onChange={handleChange} required className="input-field" placeholder="Dirección" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" name="email" value={gymData.email} onChange={handleChange} required className="input-field" placeholder="Correo electrónico" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                    <input type="text" name="numberPhone" value={gymData.numberPhone} onChange={handleChange} required className="input-field" placeholder="Teléfono" />
                </div>
                <div className="flex items-center space-x-3">
                    <label className="text-sm font-medium text-gray-700">Activo</label>
                    <input type="checkbox" name="isActive" checked={gymData.isActive} onChange={handleChange} className="h-5 w-5" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">ID Plan de Pago</label>
                    <input type="number" name="idPaymentPlan" value={gymData.idPaymentPlan} onChange={handleChange} required className="input-field" placeholder="ID del plan" />
                </div>
                <div className="flex justify-center gap-2">
                    <button type="submit" className="btn-primary">Guardar Cambios</button>
                    <button type="button" onClick={() => navigate("/admin-dashboard/gyms")} className="btn-secondary">Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default EditGym;
