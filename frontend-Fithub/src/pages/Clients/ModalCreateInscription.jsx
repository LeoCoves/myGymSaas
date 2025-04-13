import { useEffect, useState } from "react";
import { getPaymentPlans } from "../../services/gymPaymentPlan.js";
import { createInscription } from "../../services/clients.js";

const CreateInscriptionModal = ({ client, idGym, onClose, onInscriptionCreated }) => {
    const [paymentPlans, setPaymentPlans] = useState([]);
    const [inscription, setInscription] = useState({
        idGymCustomPaymentPlan: '',
        idGym,
        idClient: client.idClient,
        startDate: '',
        endDate: '',
        payment: '',
        cost: '',
        refund: '',
        paymentMethod: ''
    });

    useEffect(() => {
        const fetchPlans = async () => {
            const plans = await getPaymentPlans(idGym);
            setPaymentPlans(plans);
        };
        fetchPlans();
    }, [idGym]);

    const calculateEndDate = (startDate, period, duration) => {
        const date = new Date(startDate);
        switch (period) {
            case 'Diario': date.setDate(date.getDate() + duration); break;
            case 'Semanal': date.setDate(date.getDate() + 7 * duration); break;
            case 'Mensual': date.setMonth(date.getMonth() + duration); break;
            case 'Anual': date.setFullYear(date.getFullYear() + duration); break;
        }
        return date.toISOString().split('T')[0];
    };

    const selectPlan = (plan) => {
        const today = new Date().toISOString().split('T')[0];
        const end = calculateEndDate(today, plan.period, plan.duration);
        setInscription((prev) => ({
            ...prev,
            idGymCustomPaymentPlan: plan.idGymCustomPaymentPlan,
            cost: plan.price,
            startDate: today,
            endDate: end,
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInscription((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            ...inscription,
            payment: parseFloat(inscription.payment),
            cost: parseFloat(inscription.cost),
            refund: parseFloat(inscription.refund),
            startDate: new Date(inscription.startDate).toISOString(),
            endDate: new Date(inscription.endDate).toISOString(),
        };
        try {
            await createInscription(client.idClient, data);
            await onInscriptionCreated(); // Actualizar estado en el padre
        } catch (err) {
            console.error("Error creando inscripción", err);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl w-full max-w-4xl overflow-y-auto max-h-[90vh]">
                <h2 className="text-lg font-bold mb-4">Nueva Inscripción para {client.name}</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        {paymentPlans.map(plan => (
                            <div
                                key={plan.idGymCustomPaymentPlan}
                                className="border p-4 rounded hover:shadow cursor-pointer mb-2"
                                onClick={() => selectPlan(plan)}
                            >
                                <p className="font-semibold">{plan.name}</p>
                                <p>{plan.price}€ / {plan.period}</p>
                            </div>
                        ))}
                    </div>
                    <div className="space-y-4">
                        <input type="date" name="startDate" value={inscription.startDate} onChange={handleChange} className="w-full px-4 py-2 border rounded" />
                        <input type="date" name="endDate" value={inscription.endDate} disabled className="w-full px-4 py-2 border rounded" />
                        <input type="number" name="payment" value={inscription.payment} onChange={handleChange} placeholder="Pago (€)" className="w-full px-4 py-2 border rounded" />
                        <input type="number" name="cost" value={inscription.cost} disabled className="w-full px-4 py-2 border rounded" />
                        <input type="number" name="refund" value={inscription.payment - inscription.cost} onChange={handleChange} placeholder="Devolver (€)" className="w-full px-4 py-2 border rounded" />
                        <select name="paymentMethod" value={inscription.paymentMethod} onChange={handleChange} className="w-full px-4 py-2 border rounded">
                            <option value="">Selecciona forma de pago</option>
                            <option value="cash">Efectivo</option>
                            <option value="visa">Visa</option>
                            <option value="other">Otro</option>
                        </select>
                        <div className="flex gap-4">
                            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Guardar Inscripción</button>
                            <button type="button" onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded">Cancelar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateInscriptionModal;
