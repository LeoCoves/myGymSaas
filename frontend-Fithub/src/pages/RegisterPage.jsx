import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [gymName, setGymName] = useState('');
    const [gymDescription, setGymDescription] = useState('');
    const [gymAddress, setGymAddress] = useState('');
    const [numberPhone, setNumberPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    const validateEmail = (email) => email.includes('@');
    const validatePassword = (password) =>
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmailError('');
        setPasswordError('');

        let hasError = false;

        if (!validateEmail(email)) {
            setEmailError('Email must contain "@"');
            hasError = true;
        }

        if (!validatePassword(password)) {
            setPasswordError('Password must be at least 6 characters and include letters and numbers.');
            hasError = true;
        }

        if (hasError) return;

        const gymData = {
            gymName,
            gymDescription,
            gymAddress,
            numberPhone,
            email,
            password,
        };

        try {
            const response = await fetch('https://localhost:7216/api/Auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(gymData),
            });

            const data = await response.json();

            if (response.ok) {
                navigate('/login');
            } else {
                console.error(data.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <section>
            <div className="flex flex-col items-center justify-center">
            <Link to="/">
            <span className="logoHome">
            Fithub
            </span>
            </Link>
                <div className="w-full bg-white rounded-lg shadow md:mt-2 sm:max-w-lg xl:p-0 shadow-lg">
                    <div className="p-6 space-y-4 md:space-y-2 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Register your gym account
                        </h1>

                        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                            {/* Gym Name */}
                            <div>
                                <label htmlFor="gymName" className="block mb-2 text-sm font-medium text-gray-900">
                                    Gym Name
                                </label>
                                <input
                                    type="text"
                                    name="gymName"
                                    id="gymName"
                                    value={gymName}
                                    onChange={(e) => setGymName(e.target.value)}
                                    className="bg-transparent border border-black text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="Enter gym name"
                                    required
                                />
                            </div>

                            {/* Gym Description */}
                            <div>
                                <label htmlFor="gymDescription" className="block mb-2 text-sm font-medium text-gray-900">
                                    Gym Description
                                </label>
                                <input
                                    type="text"
                                    name="gymDescription"
                                    id="gymDescription"
                                    value={gymDescription}
                                    onChange={(e) => setGymDescription(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 border-black"
                                    placeholder="Enter gym description"
                                    required
                                />
                            </div>

                            {/* Address & Phone */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="gymAddress" className="block mb-2 text-sm font-medium text-gray-900">
                                        Gym Address
                                    </label>
                                    <input
                                        type="text"
                                        name="gymAddress"
                                        id="gymAddress"
                                        value={gymAddress}
                                        onChange={(e) => setGymAddress(e.target.value)}
                                        className="bg-white border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 border-black"
                                        placeholder="Enter gym address"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="numberPhone" className="block mb-2 text-sm font-medium text-gray-900">
                                        Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        name="numberPhone"
                                        id="numberPhone"
                                        value={numberPhone}
                                        onChange={(e) => setNumberPhone(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 border-black"
                                        placeholder="Enter phone number"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 border-black"
                                    placeholder="Enter email address"
                                    required
                                />
                                {emailError && (
                                    <p className="mt-1 text-sm text-red-600">{emailError}</p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 border-black"
                                    placeholder="Enter password"
                                    required
                                />
                                {passwordError && (
                                    <p className="mt-1 text-sm text-red-600">{passwordError}</p>
                                )}
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2 text-center"
                            >
                                Sign up
                            </button>

                            <p className="text-sm font-light text-gray-500">
                                Already have an account?{' '}
                                <a href="/login" className="font-medium text-gray-600 hover:underline">
                                    Login
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Register;
