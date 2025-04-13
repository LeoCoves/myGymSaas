import React from 'react';
import "../styles/HomePage.css"
import WordRotator  from '../components/WordRotator.jsx';
import {CardInfo} from '../components/CardInfo.jsx';
import { PaymentPlan } from '../components/PaymentPlan.jsx';
import Footer from '../components/Footer.jsx';
import Header from '../components/Header.jsx';


function HomePage(){
    return (
        <>
        <Header />
        <div className="container mx-auto px-4 py-6">
            <header className="text-center py-12">
                <h1 className="text-sky">Software adaptado para</h1>
                <h1 className="text-amber-500 font-bold mt-4">
                <WordRotator />
                </h1>
                <h3 className="my-6 text-lg text-gray-700">
                Mejora la experiencia del cliente y ahorra tiempo con nuestras soluciones
                <br />
                de gestión empresarial, automatizando tu negocio
                </h3>

                <button className="bg-amber-500 text-white py-2 px-6 rounded-full hover:bg-amber-400 transition duration-300">
                <a href="/about">Saber más</a>
                </button>
            </header>

            <img src='' alt="Visual description" className="w-full h-64 object-cover mt-8 mb-8" />

            <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                <section className="text-center bg-white shadow-lg p-6 rounded-lg">
                <h2 className="text-3xl font-bold text-sky-500">+9000</h2>
                <p className="text-gray-600">Negocios</p>
                </section>
                <section className="text-center bg-white shadow-lg p-6 rounded-lg">
                <h2 className="text-3xl font-bold text-sky-500">+9000</h2>
                <p className="text-gray-600">Negocios</p>
                </section>
                <section className="text-center bg-white shadow-lg p-6 rounded-lg">
                <h2 className="text-3xl font-bold text-sky-500">+9000</h2>
                <p className="text-gray-600">Negocios</p>
                </section>
                <section className="text-center bg-white shadow-lg p-6 rounded-lg">
                <h2 className="text-3xl font-bold text-sky-500">+9000</h2>
                <p className="text-gray-600">Negocios</p>
                </section>
            </section>

            <section className="text-center mb-12">
                <h2 className="text-3xl font-bold text-sky-500 mb-4">¿Qué podemos hacer por ti?</h2>
                <ul className="list-none space-y-4 text-lg text-gray-700">
                <li className="hover:text-amber-500 transition duration-300">Automatizar procesos</li>
                <li className="hover:text-amber-500 transition duration-300">Mejorar la experiencia del cliente</li>
                <li className="hover:text-amber-500 transition duration-300">Incrementar la productividad</li>
                </ul>
            </section>

            <section className="my-12">
                <h2 className="text-3xl font-bold text-sky-500 mb-6 text-center">Todo lo que necesitas saber</h2>

                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <CardInfo 
                    title="Hola"
                    info="Automatiza tus procesos y centrate en tus clientes"
                    img="https://www.lummi.ai/api/render/image/49dc00ca-6991-4d91-be59-5defb5180f61?token=eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjQ5ZGMwMGNhLTY5OTEtNGQ5MS1iZTU5LTVkZWZiNTE4MGY2MSIsImRvd25sb2FkU2l6ZSI6Im1lZGl1bSIsInJlbmRlclNwZWNzIjp7ImVmZmVjdHMiOnsicmVmcmFtZSI6e319fSwic2hvdWxkQXV0b0Rvd25sb2FkIjpmYWxzZSwianRpIjoiNVd6N0dfajJGZUVwWk5rRzF1QUtpIiwiaWF0IjoxNzQxODg3MTM1LCJleHAiOjE3NDE4ODcxOTV9.D7siuVg6t7cD-rmLeiWOykX6cXXe0ADsFNp4zdpteyg"
                    width="350px"
                    height="400px"
                />
                <CardInfo 
                    title="Hola"
                    info="Automatiza tus procesos y centrate en tus clientes"
                    img="https://www.lummi.ai/api/render/image/49dc00ca-6991-4d91-be59-5defb5180f61?token=eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjQ5ZGMwMGNhLTY5OTEtNGQ5MS1iZTU5LTVkZWZiNTE4MGY2MSIsImRvd25sb2FkU2l6ZSI6Im1lZGl1bSIsInJlbmRlclNwZWNzIjp7ImVmZmVjdHMiOnsicmVmcmFtZSI6e319fSwic2hvdWxkQXV0b0Rvd25sb2FkIjpmYWxzZSwianRpIjoiNVd6N0dfajJGZUVwWk5rRzF1QUtpIiwiaWF0IjoxNzQxODg3MTM1LCJleHAiOjE3NDE4ODcxOTV9.D7siuVg6t7cD-rmLeiWOykX6cXXe0ADsFNp4zdpteyg"
                    width="350px"
                    height="400px"
                />
                <CardInfo 
                    title="Hola"
                    info="Automatiza tus procesos y centrate en tus clientes"
                    img="https://www.lummi.ai/api/render/image/49dc00ca-6991-4d91-be59-5defb5180f61?token=eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjQ5ZGMwMGNhLTY5OTEtNGQ5MS1iZTU5LTVkZWZiNTE4MGY2MSIsImRvd25sb2FkU2l6ZSI6Im1lZGl1bSIsInJlbmRlclNwZWNzIjp7ImVmZmVjdHMiOnsicmVmcmFtZSI6e319fSwic2hvdWxkQXV0b0Rvd25sb2FkIjpmYWxzZSwianRpIjoiNVd6N0dfajJGZUVwWk5rRzF1QUtpIiwiaWF0IjoxNzQxODg3MTM1LCJleHAiOjE3NDE4ODcxOTV9.D7siuVg6t7cD-rmLeiWOykX6cXXe0ADsFNp4zdpteyg"
                    width="350px"
                    height="400px"
                />
                </section>
            </section>

            <section className="my-12">
                <h2 className="text-3xl font-bold text-sky-500 mb-6 text-center">FAQ</h2>

                <section className="space-y-8">
                <article className="bg-white shadow-md p-6 rounded-lg">
                    <h2 className="text-xl font-semibold text-sky-500">¿Qué es Lummi?</h2>
                    <p className="text-gray-600">Es una plataforma de automatización de procesos que te permite centrarte en tus clientes.</p>
                </article>
                <article className="bg-white shadow-md p-6 rounded-lg">
                    <h2 className="text-xl font-semibold text-sky-500">¿Qué es Lummi?</h2>
                    <p className="text-gray-600">Es una plataforma de automatización de procesos que te permite centrarte en tus clientes.</p>
                </article>
                <article className="bg-white shadow-md p-6 rounded-lg">
                    <h2 className="text-xl font-semibold text-sky-500">¿Qué es Lummi?</h2>
                    <p className="text-gray-600">Es una plataforma de automatización de procesos que te permite centrarte en tus clientes.</p>
                </article>
                </section>
            </section>

            <PaymentPlan />

            <footer className="bg-gray-800 text-white py-8 text-center mt-12">
                <Footer />
            </footer>
            </div>

        </>
    )
}

export default HomePage;