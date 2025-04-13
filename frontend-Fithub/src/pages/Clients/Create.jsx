import { useState } from "react";
import { createClient, updateClient } from "../../services/clients.js";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import CreateInscriptionModal from "../Clients/ModalCreateInscription.jsx";

const CreateClientPage = () => {
    const navigate = useNavigate();

    const { idGym, gymName } = useAuth();
    const [clientData, setClientData] = useState({
        name: "",
        surname: "",
        email: "",
        phoneNumber: "",
        isActive: false,
        firstDayInscription: new Date().toISOString().split("T")[0],
        idGym: idGym
    });
    const [newClient, setNewClient] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClientData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const created = await createClient({ ...clientData, isActive: false, firstDayInscription: new Date().toISOString().split("T")[0], idGym: idGym });
            console.log("Cliente creado:", created);
            setNewClient(created);
            setShowModal(true); // Abrir modal después de crear cliente
        } catch (err) {
            console.error("Error al crear cliente", err);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="p-10 shadow-lg rounded bg-gray-50 space-y-4">
                <h2 className="text-xl font-bold">Crear Cliente</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <input name="name" value={clientData.name} onChange={handleChange} placeholder="Nombre" className="px-4 py-2 border rounded" />
                    <input name="surname" value={clientData.surname} onChange={handleChange} placeholder="Apellido" className="px-4 py-2 border rounded" />
                    <input name="email" type="email" value={clientData.email} onChange={handleChange} placeholder="Correo" className="px-4 py-2 border rounded" />
                    <input name="phoneNumber" value={clientData.phoneNumber} onChange={handleChange} placeholder="Teléfono" className="px-4 py-2 border rounded" />
                </div>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Crear Cliente</button>
            </form>

            {/* Modal de inscripción */}
            {newClient && showModal && (
                <CreateInscriptionModal
                    client={newClient}
                    idGym={idGym}
                    onClose={() =>{
                        setShowModal(false);
                        navigate(`/${gymName}/clients`);
                    }}
                    onInscriptionCreated={async () => {
                        await updateClient(newClient.idClient, { ...newClient, isActive: true });
                        setShowModal(false);
                        navigate(`/${gymName}/clients`);;
                    }}
                />
            )}
        </div>
    );
};

export default CreateClientPage;

