import React from 'react';
import WordRotator  from '../components/WordRotator.jsx';
import {CardInfo} from '../components/CardInfo.jsx';
import { PaymentPlan } from '../components/PaymentPlan.jsx';
import Footer from '../components/Footer.jsx';
import Header from '../components/Header.jsx';
import '../../src/styles/HomePage.css';


function HomePage(){
    return (
        <>
        <Header />
        <div className="container">
  {/* Hero */}
  <header className="hero">
  <div class="hidden sm:mb-8 sm:flex sm:justify-center">
        <div class="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
          Announcing our next round of funding. <a href="#" class="font-semibold text-black"><span class="absolute inset-0" aria-hidden="true"></span>Read more <span aria-hidden="true">&rarr;</span></a>
        </div>
      </div>
    <h1 className="hero-title">Software adaptado para</h1>
    <h2 className="hero-rotator">
      <WordRotator />
    </h2>
    <p className="hero-text">
      Mejora la experiencia del cliente y ahorra tiempo con nuestras soluciones de gestión empresarial, automatizando tu negocio.
    </p>
    <a href="/about" className="hero-button">
      Saber más
    </a>
  </header>

  
<div>
<div class="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[8px] rounded-t-xl h-[172px] max-w-[301px] md:h-[294px] md:max-w-[512px]">
    <div class="rounded-lg overflow-hidden h-[156px] md:h-[278px] bg-white dark:bg-gray-800">
        <img src="https://flowbite.s3.amazonaws.com/docs/device-mockups/laptop-screen.png" class="dark:hidden h-[156px] md:h-[278px] w-full rounded-lg" alt=""/>
        <img src="https://flowbite.s3.amazonaws.com/docs/device-mockups/laptop-screen-dark.png" class="hidden dark:block h-[156px] md:h-[278px] w-full rounded-lg" alt=""/>
    </div>
</div>
<div class="relative mx-auto bg-gray-900 dark:bg-gray-700 rounded-b-xl rounded-t-sm h-[17px] max-w-[351px] md:h-[21px] md:max-w-[597px]">
    <div class="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-xl w-[56px] h-[5px] md:w-[96px] md:h-[8px] bg-gray-800"></div>
</div>
</div>




  {/* Números destacados */}
  <section className="stats-section">
    <div className="flex gap-8 justify-center items-center flex-wrap">
      {['Negocios', 'Empresas felices', 'Procesos automatizados', 'Clientes satisfechos'].map((item, index) => (
        <div key={index} className="stat-box w-full sm:w-1/5 flex flex-col items-center justify-center text-center p-4 bg-white rounded-lg shadow-md">
          <h3 className="stat-number">+9000</h3>
          <p className="stat-label">{item}</p>
        </div>
      ))}
    </div>
  </section>



  <div className="overflow-hidden bg-white py-24 sm:py-32">
  <div className="mx-auto max-w-7xl px-6 lg:px-8">
    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
      <div className="lg:pt-4 lg:pr-8">
        <div className="lg:max-w-lg">
          <h2 className="text-base/7 font-semibold text-red-600">Deploy faster</h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">A better workflow</p>
          <p className="mt-6 text-lg/8 text-gray-600">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.</p>
          <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
            <div className="relative pl-9">
              <dt className="inline font-semibold text-gray-900">
                <svg className="absolute top-1 left-1 size-5 text-red-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                  <path fill-rule="evenodd" d="M5.5 17a4.5 4.5 0 0 1-1.44-8.765 4.5 4.5 0 0 1 8.302-3.046 3.5 3.5 0 0 1 4.504 4.272A4 4 0 0 1 15 17H5.5Zm3.75-2.75a.75.75 0 0 0 1.5 0V9.66l1.95 2.1a.75.75 0 1 0 1.1-1.02l-3.25-3.5a.75.75 0 0 0-1.1 0l-3.25 3.5a.75.75 0 1 0 1.1 1.02l1.95-2.1v4.59Z" clip-rule="evenodd" />
                </svg>
                Push to deploy.
              </dt>
              <dd className="inline">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.</dd>
            </div>
            <div className="relative pl-9">
              <dt className="inline font-semibold text-gray-900">
                <svg className="absolute top-1 left-1 size-5 text-red-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                  <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z" clip-rule="evenodd" />
                </svg>
                SSL certificates.
              </dt>
              <dd className="inline">Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.</dd>
            </div>
            <div className="relative pl-9">
              <dt className="inline font-semibold text-gray-900">
                <svg className="absolute top-1 left-1 size-5 text-red-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                  <path d="M4.632 3.533A2 2 0 0 1 6.577 2h6.846a2 2 0 0 1 1.945 1.533l1.976 8.234A3.489 3.489 0 0 0 16 11.5H4c-.476 0-.93.095-1.344.267l1.976-8.234Z" />
                  <path fill-rule="evenodd" d="M4 13a2 2 0 1 0 0 4h12a2 2 0 1 0 0-4H4Zm11.24 2a.75.75 0 0 1 .75-.75H16a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75h-.01a.75.75 0 0 1-.75-.75V15Zm-2.25-.75a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75H13a.75.75 0 0 0 .75-.75V15a.75.75 0 0 0-.75-.75h-.01Z" clip-rule="evenodd" />
                </svg>
                Database backups.
              </dt>
              <dd className="inline">Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.</dd>
            </div>
          </dl>
        </div>
      </div>
      <img src="https://tailwindcss.com/plus-assets/img/component-images/dark-project-app-screenshot.png" alt="Product screenshot" className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0" width="2432" height="1442"/>
    </div>
  </div>
</div>

<div className="bg-gray-50 py-24 sm:py-32">
  <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
    <h2 className="text-center text-base/7 font-semibold text-red-600">Deploy faster</h2>
    <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-gray-950 sm:text-5xl">Everything you need to deploy your app</p>
    <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
      <div className="relative lg:row-span-2">
        <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]"></div>
        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
          <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
            <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">Mobile friendly</p>
            <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.</p>
          </div>
          <div className="@container relative min-h-[30rem] w-full grow max-lg:mx-auto max-lg:max-w-sm">
            <div className="absolute inset-x-10 top-10 bottom-0 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 shadow-2xl">
              <img className="size-full object-cover object-top" src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-mobile-friendly.png" alt=""/>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 lg:rounded-l-[2rem]"></div>
      </div>
      <div className="relative max-lg:row-start-1">
        <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]"></div>
        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
          <div className="px-8 pt-8 sm:px-10 sm:pt-10">
            <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">Performance</p>
            <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">Lorem ipsum, dolor sit amet consectetur adipisicing elit maiores impedit.</p>
          </div>
          <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
            <img className="w-full max-lg:max-w-xs" src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-performance.png" alt=""/>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 max-lg:rounded-t-[2rem]"></div>
      </div>
      <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
        <div className="absolute inset-px rounded-lg bg-white"></div>
        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
          <div className="px-8 pt-8 sm:px-10 sm:pt-10">
            <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">Security</p>
            <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi.</p>
          </div>
          <div className="@container flex flex-1 items-center max-lg:py-6 lg:pb-2">
            <img className="h-[min(152px,40cqw)] object-cover" src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-security.png" alt=""/>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5"></div>
      </div>
      <div className="relative lg:row-span-2">
        <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
          <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
            <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">Powerful APIs</p>
            <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget sem sodales gravida.</p>
          </div>
          <div className="relative min-h-[30rem] w-full grow">
            <div className="absolute top-10 right-0 bottom-0 left-10 overflow-hidden rounded-tl-xl bg-gray-900 shadow-2xl">
              <div className="flex bg-gray-800/40 ring-1 ring-white/5">
                <div className="-mb-px flex text-sm/6 font-medium text-gray-400">
                  <div className="border-r border-b border-r-white/10 border-b-white/20 bg-white/5 px-4 py-2 text-white">NotificationSetting.jsx</div>
                  <div className="border-r border-gray-600/10 px-4 py-2">App.jsx</div>
                </div>
              </div>
              <div className="px-6 pt-6 pb-14">
              </div>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
      </div>
    </div>
  </div>
</div>
</div>

<Footer />
        </>
    )
}

export default HomePage;