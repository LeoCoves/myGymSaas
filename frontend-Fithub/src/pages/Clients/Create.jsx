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
                <div className="grid grid-cols-1 sm:grid-cols-1 gap-6 text-left">

                <div className="col-span-full">
                <label htmlFor="photo" className="block text-sm/6 font-medium text-gray-900">Photo</label>
                <div className="mt-2 flex items-center gap-x-3">
                    <svg className="size-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon">
                    <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                    </svg>
                    <button type="button" className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50">Change</button>
                </div>
                </div>

                <div className="col-span-full">
                <label htmlFor="cover-photo" className="block text-sm/6 font-medium text-gray-900">Cover photo</label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                    <svg className="mx-auto size-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon">
                        <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd" />
                    </svg>
                    <div className="mt-4 flex text-sm/6 text-gray-600">
                        <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-orange-600 focus-within:ring-2 focus-within:ring-red-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-red-500">
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                    </div>
                </div>
                </div>

                    <label htmlFor="name">
                        Name    
                    </label>
                    <input name="name" value={clientData.name} onChange={handleChange} placeholder="Nombre" className="px-4 py-2 border rounded" />
                    <label htmlFor="surname">
                        Surname    
                    </label>
                    <input name="surname" value={clientData.surname} onChange={handleChange} placeholder="Apellido" className="px-4 py-2 border rounded" />
                    <label htmlFor="email">
                        Email   
                    </label>
                    <input name="email" type="email" value={clientData.email} onChange={handleChange} placeholder="Correo" className="px-4 py-2 border rounded" />
                    <label htmlFor="phoneNumber">
                        Phone Number  
                    </label>
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

