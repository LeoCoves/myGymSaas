import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getGymById, updateGym } from "../../services/gyms.js";
import { getPaymentPlans } from "../../services/paymentPlans.js";

const EditGym = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [paymentPlans, setPaymentPlans] = useState([]);

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
                console.log(data);
                if (!data) throw new Error("No se encontró el gimnasio");
                setGymData(data);
            } catch (error) {
                setError(error.message || "Error al obtener el gimnasio");
            } finally {
                setLoading(false);
            }
        };

        const fetchPaymentPlans = async () => {
            try {
                const plans = await getPaymentPlans();
                console.log(plans);
                if (!plans) throw new Error("No se encontraron planes de pago");
                setPaymentPlans(plans);
            } catch (err) {
                console.error("Error al cargar los planes de pago:", err);
            }
        };
    
        fetchPaymentPlans();
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
            navigate("/admin/gyms");
        } catch (error) {
            setError("Error actualizando el gimnasio", error.message || "Error desconocido");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <form onSubmit={handleSubmit} className="shadow-lg space-y-4 border p-10 rounded bg-gray-50 m-10">
           
          

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex items-center gap-x-3 mt-4">
                        <svg className="size-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor">
                            <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                        </svg>
                        <button type="button" className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50">
                            Cambiar Foto
                        </button>
                    </div>

                    <div>
                        <label className="block">Nombre</label>
                        <input type="text" name="name" value={gymData.name} onChange={handleChange} className="px-4 py-2 border border-black rounded w-full" required />
                    </div>

                    <div>
                        <label className="block">Descripción</label>
                        <input name="description" value={gymData.description} onChange={handleChange} className="px-4 py-2 border border-black rounded w-full" rows="3" required />
                    </div>

                    <div>
                        <label className="block">Dirección</label>
                        <input type="text" name="address" value={gymData.address} onChange={handleChange} className="px-4 py-2 border border-black rounded w-full" required />
                    </div>

                    <div>
                        <label className="block">Correo Electrónico</label>
                        <input type="email" name="email" value={gymData.email} onChange={handleChange} className="px-4 py-2 border border-black rounded w-full" required />
                    </div>

                    <div>
                        <label className="block">Teléfono</label>
                        <input type="text" name="numberPhone" value={gymData.numberPhone} onChange={handleChange} className="px-4 py-2 border border-black rounded w-full" required />
                    </div>

                    <div className="flex items-center gap-3">
                        <label className="text-sm">Activo</label>
                        <input type="checkbox" name="isActive" checked={gymData.isActive} onChange={handleChange} className="h-5 w-5" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Plan de Pago</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {paymentPlans.map((plan) => (
                            <div
                                key={plan.id}
                                onClick={() => setGymData({ ...gymData, idPaymentPlan: paymentPlans.idPaymentPlan })}
                                className={`cursor-pointer border p-4 rounded-lg shadow-md transition-all duration-200 ${
                                    Number(gymData.idPaymentPlan) === Number(paymentPlans.idPaymentPlan)
                                    ? "border-red-500 ring-2 ring-red-300 bg-red-50"
                                    : "border-gray-300 hover:border-red-400 hover:shadow-lg"
                                }`}
                            >
                                <h3 className="text-lg font-semibold text-gray-800">{plan.name}</h3>
                                <p className="text-gray-600">{plan.description}</p>
                                <p className="mt-2 font-medium text-red-600">
                                {plan.price} {plan.currency} / {plan.period}
                                </p>
                            </div>
                            ))}
                        </div>
                        </div>



                    <div className="col-span-full flex justify-center gap-4 mt-6">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Guardar Cambios</button>
                        <button type="button" onClick={() => navigate("/admin/gyms")} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Cancelar</button>
                    </div>
                </div>
        </form>
    );
};

export default EditGym;
