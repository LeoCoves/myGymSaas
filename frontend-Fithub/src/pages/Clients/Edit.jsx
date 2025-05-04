import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { getClientById, updateClient, getInscriptionByClient } from "../../services/clients.js";
import { getPaymentPlans } from "../../services/gymPaymentPlan.js";
import { createInscription } from "../../services/clients";

const EditClientPage = () => {
    const { idClient } = useParams();
    const navigate = useNavigate();
    const { gymName, idGym } = useAuth();
    const [formError, setFormError] = useState("");
    const [client, setClient] = useState(null);
    const [paymentPlans, setPaymentPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [inscription, setInscription] = useState({
        idGymCustomPaymentPlan: '',
        idGym: idGym,
        idClient: idClient,
        startDate: '',
        endDate: '',
        payment: '',
        cost: '',
        refund: '',
        paymentMethod: ''
    });



    // Manejar cambio de inscripción
    const handleInscriptionChange = (e) => {
        const { name, value } = e.target;
        setInscription((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Obtener detalles del cliente
                const clientData = await getClientById(idClient);
                setClient(clientData);
    
                // Obtener planes de pago
                const plansData = await getPaymentPlans(idGym);
                setPaymentPlans(plansData);
    
                // Buscar la inscripción asociada al cliente
                if (clientData.idInscription) {
                    const inscriptionData = await getInscriptionByClient(clientData.idClient);
                    console.log("Inscripción del cliente:", inscriptionData);
                    setInscription(inscriptionData);
                }
            } catch (err) {
                setError("Error al cargar los datos", err);
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
    }, [idClient, idGym]);
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setClient((prevClient) => ({
            ...prevClient,
            [name]: value,
        }));
    };

    // Calcular la fecha de finalización según el tipo de plan
    const calculateEndDate = (startDate, period, duration) => {
        const date = new Date(startDate); // Convertimos startDate a un objeto Date
        let newDate;
      
        switch (period) {
          case 'Diario':
            newDate = new Date(date.setDate(date.getDate() + duration)); // Agregar días
            break;
          case 'Semanal':
            newDate = new Date(date.setDate(date.getDate() + duration * 7)); // Agregar semanas (7 días por semana)
            break;
          case 'Mensual':
            newDate = new Date(date.setMonth(date.getMonth() + duration)); // Agregar meses
            break;
          case 'Anual':
            newDate = new Date(date.setFullYear(date.getFullYear() + duration)); // Agregar años
            break;
          default:
            newDate = date;
            break;
        }
      
        return newDate.toISOString().split('T')[0]; // Convertir de nuevo a formato de fecha 'YYYY-MM-DD'
    };

    const handleSelectPlan = (planId, price, period, duration) => {
        // Establecer el plan seleccionado
        console.log("Plan seleccionado:", planId, price, period, duration);
        const currentDate = new Date();
        
        // Calcular el endDate dependiendo del tipo de plan (diario, semanal, mensual, anual)
        const endDate = calculateEndDate(currentDate.toISOString().split("T")[0], period, duration);
        
        // Actualizamos el estado de la inscripción
        setInscription((prevInscription) => ({
            ...prevInscription,
            idGymCustomPaymentPlan: planId,
            cost: price,
            startDate: currentDate.toISOString().split("T")[0], // Convertir la fecha a formato 'YYYY-MM-DD'
            endDate: endDate, // Usamos la fecha calculada
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateClient(idClient, client);
            navigate(`/${gymName}/client/${idClient}`);
        } catch (err) {
            setError("Error al actualizar el cliente", err);
        }
    };

    const handleInscriptionSubmit = async (e) => {
        e.preventDefault();

        if (!inscription?.idGymCustomPaymentPlan) {
            setFormError("Debes seleccionar un plan antes de continuar.");
            return;
          }

        if (parseFloat(inscription.payment) < parseFloat(inscription.cost)) {
            setFormError("El pago no puede ser menor que el costo del plan.");
            return;
          }
        
          setFormError(""); // Limpiar errores si todo está bien
        try {
            const data = {
                ...inscription,
                idGym,
                idClient: idClient,
                startDate: new Date(inscription.startDate).toISOString(),
                endDate: new Date(inscription.endDate).toISOString(),
                payment: parseFloat(inscription.payment),
                cost: parseFloat(inscription.cost),
                refund: parseFloat(inscription.refund),
                paymentMethod: inscription.paymentMethod || null,
            };
            await createInscription(idClient, data);
            // 🔁 Recargar inscripción actualizada
            const updatedInscription = await getInscriptionByClient(idClient);
            setInscription(updatedInscription);
            navigate(`/${gymName}/clients`);
        } catch (err) {
            alert("Error al crear la inscripción");
            console.error(err);
        }
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
          
        <form onSubmit={handleSubmit} className="shadow-lg space-y-4 border p-10 rounded bg-gray-50 my-10">
            
            <button
                type="button"
                className=" bg-gray-50 border-transparent hover:border-transparent focus:outline-none focus:ring-0 w-full flex justify-between items-centertext-left"
                onClick={() => setIsOpen(!isOpen)}
            >

                <div className="justify-content-center relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                            <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                            </svg>
                </div>

        <h2 className="text-xl font-bold">Editar Cliente {client.name}</h2>
        <svg
          className={`w-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
                {isOpen && 
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                   
                    <div className="mt-2 flex items-center gap-x-3">
                        <svg className="size-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon">
                        <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                        </svg>
                        <button type="button" className="rounded-md w-full bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50">Change</button>
                    </div>
                    <div>
                        <label className="block">Nombre</label>
                        <input
                            type="text"
                            name="name"
                            value={client?.name || ""}
                            onChange={handleInputChange}
                            className="px-4 py-2 border border-black rounded w-full"
                        />
                    </div>
                    <div>
                        <label className="block">Apellido</label>
                        <input
                            type="text"
                            name="surname"
                            value={client?.surname || ""}
                            onChange={handleInputChange}
                            className="px-4 py-2 border border-black rounded w-full"
                        />
                    </div>
                    <div>
                        <label className="block">Correo Electrónico</label>
                        <input
                            type="email"
                            name="email"
                            value={client?.email || ""}
                            onChange={handleInputChange}
                            className="px-4 py-2 border border-black rounded w-full"
                        />
                    </div>
                    <div>
                        <label className="block">Número de Teléfono</label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={client?.phoneNumber || ""}
                            onChange={handleInputChange}
                            className="px-4 py-2 border border-black rounded w-full"
                        />
                    <div className="flex align-center mt-10">
                    <div className="flex gap-5 align-center mt-10">
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                                Guardar cambios
                            </button>
                            <Link to={`/${gymName}/clients`} className="px-4 py-2 rounded bg-gray-500 hover:bg-gray-600 hover:text-white">
                            Cancelar
                        </Link>
                        </div>
                    </div>

                    </div>
                    <div className="grid-col-2 shadow-lgs rounded-2xl p-6 border hover:shadow-xl transition-shadow cursor-pointer">
                        {/* ... otros campos del formulario */}

                        <h2 className="block text-lg text-black pb-4">Plan Contratado Actual</h2>
                        <div className="rounded-3xl bg-white shadow-2xl ring-1 ring-gray-200 p-8 text-gray-900 w-full">
                    {inscription ? (
                        inscription.plan ? (
                        <div className="flex flex-col lg:flex-row justify-between gap-8">
                            {/* Columna izquierda: info del plan */}
                            <div className="flex-1">
                            <h3 className="text-base font-semibold text-red-600">
                                {inscription.plan.name}
                            </h3>
                            <p className="mt-4 text-gray-600">{inscription.plan.description}</p>
                            <p className="mt-4 flex items-baseline gap-x-2">
                                <span className="text-4xl font-semibold tracking-tight text-gray-900">
                                {inscription.plan.price}€
                                </span>
                                <span className="text-base text-gray-500">/{inscription.plan.period}</span>
                            </p>
                            <p className="mt-4 text-sm text-gray-500">
                                {new Date(inscription.startDate).toLocaleDateString()} -{" "}
                                {new Date(inscription.endDate).toLocaleDateString()}
                            </p>
                            </div>
                        </div>
                        ) : (
                        <p className="text-gray-500">Sin plan contratado</p>
                        )
                    ) : (
                        <p className="text-gray-500">Cargando inscripción...</p>
                    )}
                    </div>

                    </div>
                </div>}
                
            </form>

            
            <form onSubmit={handleInscriptionSubmit} className="shadow-lg space-y-4 border p-10 rounded bg-gray-50">
            <h2 className="text-xl font-bold mb-4">Crear nueva inscripción</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Planes a la izquierda */}
                    <div className="space-y-4 mr-10">
                    {paymentPlans.map((plan) => (
                        <div
                        key={plan.idGymCustomPaymentPlan}
                        className={`bg-white shadow-lg rounded-2xl p-6 border hover:shadow-xl transition-shadow cursor-pointer ${
                            inscription?.idGymCustomPaymentPlan === plan.idGymCustomPaymentPlan ? "border-red-500" : "border-gray-200"
                        }`}
                        onClick={() => handleSelectPlan(plan.idGymCustomPaymentPlan, plan.price, plan.period, plan.duration)}
                        >
                        <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                        <p className="text-gray-600 mt-2">{plan.price}€/{plan.period}</p>
                        <div className="mt-4 text-sm text-gray-500">
                            <p><strong>Description:</strong> {plan.description}</p>
                        </div>
                        </div>
                    ))}
                    </div>

                    {/* Inputs a la derecha */}
                    <div className="space-y-5 text-left">
                    
                    <div className="flex gap-5 align-center">
                        <div>
                            <label>Fecha de inicio</label>
                            <input
                            type="date"
                            name="startDate"
                            value={inscription.startDate}
                            onChange={handleInscriptionChange}
                            className="px-4 py-2 border rounded border-black w-full"
                            />
                        </div>

                        <div>
                            <label>Fecha de finalización</label>
                            <input
                            type="date"
                            name="endDate"
                            value={inscription.endDate}
                            onChange={handleInscriptionChange}
                            className="px-4 py-2 border rounded border-black w-full"
                            disabled
                            />
                        </div>
                    </div>

                    <div>
                        <label>Pago realizado (€)</label>
                        <input
                        type="number"
                        name="payment"
                        value={inscription.payment}
                        onChange={handleInscriptionChange}
                        className="px-4 py-2 border rounded border-black w-full"
                        />
                    </div>

                    <div>
                        <label>Costo del plan (€)</label>
                        <input
                        type="number"
                        name="cost"
                        value={inscription.cost}
                        onChange={handleInscriptionChange}
                        className="px-4 py-2 border rounded border-black w-full"
                        disabled
                        />
                    </div>

                    <div className="flex gap-5 align-center">
                        <div>
                            <label>Devolver(€)</label>
                            <input
                            type="number"
                            name="refund"
                            value={(inscription.payment - inscription.cost).toFixed(2)}
                            onChange={handleInscriptionChange}
                            className="px-4 py-2 border rounded border-black w-full"
                            />
                        </div>

                        <div>
                            <label>Forma de pago</label>
                            <select
                            name="paymentMethod"
                            value={inscription.paymentMethod}
                            onChange={handleInscriptionChange}
                            className="px-4 py-2 border rounded border-black w-full"
                            >
                            <option value="null">Seleccione un método</option>
                            <option value="cash">Efectivo</option>
                            <option value="visa">Visa</option>
                            <option value="other">Otro</option>
                            </select>
                        </div>
                    </div>

                    {formError && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
                        {formError}
                        </div>
                    )}

                    <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                        Crear Inscripción
                    </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditClientPage;
