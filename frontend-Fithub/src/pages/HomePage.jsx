import React from 'react';
import "../styles/HomePage.css"
import WordRotator  from '../components/WordRotator.jsx';
import {CardInfo} from '../components/CardInfo.jsx';
import { PaymentPlan } from '../components/PaymentPlan.jsx';
import Footer from '../components/Footer.jsx';


function HomePage(){
    return (
        <div>

            <h1 class="text-sky">Software adaptado para</h1>
            <h1 className="text-amber-500">
                <WordRotator />
            </h1>
            <h3 class="my-5">Mejora la experiencia del cliente y ahorra tiempo con nuestras soluciones
                <br/>
                de gestion empresarial, automatizando tu negocio
            </h3>


            <button>
                <a href="/about">Saber más</a>
            </button>

            <img src=''/>

            <section className="header info">
                <section>
                    <h2>+9000</h2>
                    <p>Negocios</p>
                </section>
                <section>
                    <h2>+9000</h2>
                    <p>Negocios</p>
                </section>
                <section>
                    <h2>+9000</h2>
                    <p>Negocios</p>
                </section>
                <section>
                    <h2>+9000</h2>
                    <p>Negocios</p>
                </section>
            </section>



            <section className="functions">
                <h2 className="title">¿Qué podemos hacer por ti?</h2>
                <ul className="list">
                    <li className="item1">Automatizar procesos</li>
                    <li className="item2">Mejorar la experiencia del cliente</li>
                    <li className="item3">Incrementar la productividad</li>
                </ul>
            </section>

            <section class="info-card">
                <h2 class="tit">Todo lo que necesitas saber</h2>

                <section className='GroupCardInfo'>
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

                    <CardInfo 
                        title="Hola"
                        info="Automatiza tus procesos y centrate en tus clientes"
                        img="https://www.lummi.ai/api/render/image/49dc00ca-6991-4d91-be59-5defb5180f61?token=eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjQ5ZGMwMGNhLTY5OTEtNGQ5MS1iZTU5LTVkZWZiNTE4MGY2MSIsImRvd25sb2FkU2l6ZSI6Im1lZGl1bSIsInJlbmRlclNwZWNzIjp7ImVmZmVjdHMiOnsicmVmcmFtZSI6e319fSwic2hvdWxkQXV0b0Rvd25sb2FkIjpmYWxzZSwianRpIjoiNVd6N0dfajJGZUVwWk5rRzF1QUtpIiwiaWF0IjoxNzQxODg3MTM1LCJleHAiOjE3NDE4ODcxOTV9.D7siuVg6t7cD-rmLeiWOykX6cXXe0ADsFNp4zdpteyg"
                        width="450px"
                        height="400px"
                    />


                    <CardInfo 
                        title="Hola"
                        info="Automatiza tus procesos y centrate en tus clientes"
                        img="https://www.lummi.ai/api/render/image/49dc00ca-6991-4d91-be59-5defb5180f61?token=eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjQ5ZGMwMGNhLTY5OTEtNGQ5MS1iZTU5LTVkZWZiNTE4MGY2MSIsImRvd25sb2FkU2l6ZSI6Im1lZGl1bSIsInJlbmRlclNwZWNzIjp7ImVmZmVjdHMiOnsicmVmcmFtZSI6e319fSwic2hvdWxkQXV0b0Rvd25sb2FkIjpmYWxzZSwianRpIjoiNVd6N0dfajJGZUVwWk5rRzF1QUtpIiwiaWF0IjoxNzQxODg3MTM1LCJleHAiOjE3NDE4ODcxOTV9.D7siuVg6t7cD-rmLeiWOykX6cXXe0ADsFNp4zdpteyg"
                        width="700px"
                        height="400px"
                    />
                </section>
            </section>


            <section>
                <h2 class="tit">FAQ</h2>
            </section>


            <section>
                <article>
                    <section>
                        <h2 class="tit">¿Qué es Lummi?</h2>
                        <p>Es una plataforma de automatización de procesos que te permite centrarte en tus</p>
                    </section>
                    <section>
                        <p>Imagen</p>
                    </section>
                </article>
                <article>
                    <section>
                        <p>Imagen</p>
                    </section>
                    <section>
                        <h2 class="tit">¿Qué es Lummi?</h2>
                        <p>Es una plataforma de automatización de procesos que te permite centrarte en tus</p>
                    </section>
                    
                </article>
                <article>
                    <section>
                        <h2 class="tit">¿Qué es Lummi?</h2>
                        <p>Es una plataforma de automatización de procesos que te permite centrarte en tus</p>
                    </section>
                    <section>
                        <p>Imagen</p>
                    </section>
                </article>
                <article>
                    <section>
                        <p>Imagen</p>
                    </section>
                    <section>
                        <h2 class="tit">¿Qué es Lummi?</h2>
                        <p>Es una plataforma de automatización de procesos que te permite centrarte en tus</p>
                    </section>
                </article>
            </section>

            <PaymentPlan/>

            
            <p>Welcome to the Home Page</p>
            <p>
                This is a paragraph of text.
            </p>
            <Footer/>
        </div>
    )
}

export default HomePage;