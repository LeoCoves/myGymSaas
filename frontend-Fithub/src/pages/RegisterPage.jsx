import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirigir después del registro

function Register() {
    const [gymName, setGymName] = useState('');
    const [gymDescription, setGymDescription] = useState('');
    const [gymAddress, setGymAddress] = useState('');
    const [numberPhone, setNumberPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Para redirigir después del registro

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Crear un objeto con los datos a enviar en la solicitud
        const gymData = {
            gymName,
            gymDescription,
            gymAddress,
            numberPhone,
            email,
            password
        };

        try {
            // Hacer la solicitud POST a la API para registrar el gimnasio
            const response = await fetch('https://localhost:7216/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(gymData) // Enviar los datos del gimnasio
            });

            const data = await response.json();

            // Verificar la respuesta de la API
            if (response.ok) {
                // Redirigir a la página de login después del registro exitoso
                navigate('/login');
            } else {
                console.error(data.message); // Mostrar mensaje de error
            }
        } catch (error) {
            console.error('Error:', error); // Mostrar errores en la consola
        }
    };

    return (
        <section>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-">
                    Fithub
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
                            Register your gym account
                        </h1>

                        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                            {/* Campo del nombre del gimnasio */}
                            <div>
                                <label htmlFor="gymName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Gym Name
                                </label>
                                <input 
                                    type="text" 
                                    name="gymName" 
                                    id="gymName" 
                                    value={gymName} 
                                    onChange={(e) => setGymName(e.target.value)} 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Enter gym name" 
                                    required 
                                />
                            </div>

                            {/* Campo de descripción del gimnasio */}
                            <div>
                                <label htmlFor="gymDescription" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Gym Description
                                </label>
                                <textarea 
                                    name="gymDescription" 
                                    id="gymDescription" 
                                    value={gymDescription} 
                                    onChange={(e) => setGymDescription(e.target.value)} 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Enter gym description" 
                                    required 
                                />
                            </div>

                            {/* Campo de la dirección del gimnasio */}
                            <div>
                                <label htmlFor="gymAddress" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Gym Address
                                </label>
                                <input 
                                    type="text" 
                                    name="gymAddress" 
                                    id="gymAddress" 
                                    value={gymAddress} 
                                    onChange={(e) => setGymAddress(e.target.value)} 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Enter gym address" 
                                    required 
                                />
                            </div>

                            {/* Campo del número de teléfono */}
                            <div>
                                <label htmlFor="numberPhone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Phone Number
                                </label>
                                <input 
                                    type="text" 
                                    name="numberPhone" 
                                    id="numberPhone" 
                                    value={numberPhone} 
                                    onChange={(e) => setNumberPhone(e.target.value)} 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Enter phone number" 
                                    required 
                                />
                            </div>

                            {/* Campo de correo electrónico */}
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Email
                                </label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    id="email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Enter email address" 
                                    required 
                                />
                            </div>

                            {/* Campo de contraseña */}
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Password
                                </label>
                                <input 
                                    type="password" 
                                    name="password" 
                                    id="password" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Enter password" 
                                    required 
                                />
                            </div>

                            {/* Botón para registrar */}
                            <button 
                                type="submit" 
                                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Sign up
                            </button>

                            {/* Link para redirigir al login */}
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account? <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Register;
