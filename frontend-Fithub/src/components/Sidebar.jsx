import { useAuth } from '../contexts/AuthContext.jsx';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const { role, gymName } = useAuth();

if(role === "Admin"){
  return(
    <div className="fixed min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-50 text-gray-800">
    <div className="fixed flex flex-col top-0 left-0 w-64 bg-white h-full border-r">
      <div className="flex items-center justify-center h-14 border-b">
        <div>FitHub</div>
      </div>
      <div className="overflow-y-auto overflow-x-hidden flex-grow bg-[#0D0E11]">
        <ul className="flex flex-col py-4 space-y-1">
          <li className="px-5">
            <div className="flex flex-row items-center h-8">
              <div className="text-sm font-light tracking-wide text-gray-500">Menu</div>
            </div>
          </li>
          <li>
            <Link to="/admin/dashboard" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
              <span className="ml-2 text-sm tracking-wide truncate">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/gyms" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
              <span className="ml-2 text-sm tracking-wide truncate">Gyms</span>
              <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-indigo-500 bg-indigo-50 rounded-full">New</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/plans" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
              <span className="ml-2 text-sm tracking-wide truncate">Plans</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/chat" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
              <span className="ml-2 text-sm tracking-wide truncate">Chat</span>
              <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-red-500 bg-red-50 rounded-full">1.2k</span>
            </Link>
            
          </li>
        </ul>
      </div>
    </div>
  </div>
  )
} else {
  return(
    <div className="fixed min-h-screen flex flex-col flex-auto flex-shrink-0 ">
    <div className="fixed flex flex-col top-0 left-0 w-64 text-black h-full border-r shadow-md">
      <div className="flex items-center justify-center h-20 bg-neutral-900">
          <span className="logo">FitHub</span>
      </div>
      <div className="overflow-y-auto overflow-x-hidden flex-grow bg-neutral-950">
        <ul className="flex flex-col py-4 space-y-3">
          <li className="px-5">
            <div className="flex flex-row items-center h-8">
              <div className="text-sm font-light tracking-wide text-gray-500">
                Menu
              </div>
            </div>
          </li>
          <li>
            <Link to={`/${gymName}/dashboard`} className="relative flex flex-row items-center h-10 focus:outline-none hover:bg-neutral-900 hover:text-red-500 border-l-4 border-transparent hover:border-red-500 pr-6">
            
              <span className="ml-5 text-md tracking-wide truncate">
                Dashboard *
                </span>
                <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-white bg-green-500 rounded-full">New</span>
            </Link>
          </li>
          <li>
            <Link to={`/${gymName}/clients`} className="relative flex flex-row items-center h-10 focus:outline-none hover:bg-neutral-900 hover:text-red-500 border-l-4 border-transparent hover:border-red-500 pr-6">
              <span className="ml-5 text-md tracking-wide truncate">Clients</span> falta mostrar si no hay clientes error
            </Link>
          </li>
          <li>
            <Link to={`/${gymName}/potential-clients`} className="relative flex flex-row items-center h-10 focus:outline-none hover:bg-neutral-900 hover:text-red-500 border-l-4 border-transparent hover:border-red-500 pr-6">
              <span className="ml-5 text-md tracking-wide truncate">Cierre Caja</span> falta hacerlo
            </Link>
          </li>
          <li>
            <Link to={`/${gymName}/tasks`} className="relative flex flex-row items-center h-10 focus:outline-none hover:bg-neutral-900 hover:text-red-500 border-l-4 border-transparent hover:border-red-500 pr-6">
              <span className="ml-5 text-md tracking-wide truncate">Tasks*</span>
            </Link>
          </li>
          <li>
            <Link to={`/${gymName}/classes`} className="relative flex flex-row items-center h-10 focus:outline-none hover:bg-neutral-900 hover:text-red-500 border-l-4 border-transparent hover:border-red-500 pr-6">
              <span className="ml-5 text-md tracking-wide truncate">Classes*</span>
            </Link>
          </li>
          <li>
            <Link to={`/${gymName}/suppliers`} className="relative flex flex-row items-center h-10 focus:outline-none hover:bg-neutral-900 hover:text-red-500 border-l-4 border-transparent hover:border-red-500 pr-6">
              <span className="ml-5 text-md tracking-wide truncate">Suppliers</span> falta mostrar error si no hay
            </Link>
          </li>
          <li>
            <Link to={`/${gymName}/plans`} className="relative flex flex-row items-center h-10 focus:outline-none hover:bg-neutral-900 hover:text-red-500 border-l-4 border-transparent hover:border-red-500 pr-6">
              <span className="ml-5 text-md tracking-wide truncate">Payment Plans</span> falta mostrar error si no hay
            </Link>
          </li>
          <li>
            <Link to={`/${gymName}/about`} className="relative flex flex-row items-center h-10 focus:outline-none hover:bg-neutral-900 hover:text-red-500 border-l-4 border-transparent hover:border-red-500 pr-6">
              <span className="ml-5 text-md tracking-wide truncate">About</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </div>
  )
}

};

export default Sidebar;