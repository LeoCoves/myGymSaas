import { useAuth } from '../contexts/AuthContext.jsx';
import '../styles/Navbar.css';
import { Link } from 'react-router-dom';
import { Menu, X } from "lucide-react";

const Sidebar = () => {
  const { role } = useAuth();

if(role === "Admin"){
  return(
    <div className="fixed min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-50 text-gray-800">
    <div className="fixed flex flex-col top-0 left-0 w-64 bg-white h-full border-r">
      <div className="flex items-center justify-center h-14 border-b">
        <div>FitHub</div>
      </div>
      <div className="overflow-y-auto overflow-x-hidden flex-grow">
        <ul className="flex flex-col py-4 space-y-1">
          <li className="px-5">
            <div className="flex flex-row items-center h-8">
              <div className="text-sm font-light tracking-wide text-gray-500">Menu</div>
            </div>
          </li>
          <li>
            <Link to="/admin-dashboard/gyms" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
              <span className="ml-2 text-sm tracking-wide truncate">Gyms</span>
              <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-indigo-500 bg-indigo-50 rounded-full">New</span>
            </Link>
          </li>
          <li>
            <Link to="/admin-dashboard/plans" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
              <span className="ml-2 text-sm tracking-wide truncate">Plans</span>
            </Link>
          </li>
          <li>
            <Link to="/admin-dashboard/chat" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
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
    <div className="fixed min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-50 text-gray-800">
    <div className="fixed flex flex-col top-0 left-0 w-64 bg-white h-full border-r">
      <div className="flex items-center justify-center h-14 border-b">
        <div>FitHub</div>
      </div>
      <div className="overflow-y-auto overflow-x-hidden flex-grow">
        <ul className="flex flex-col py-4 space-y-1">
          <li className="px-5">
            <div className="flex flex-row items-center h-8">
              <div className="text-sm font-light tracking-wide text-gray-500">Menu</div>
            </div>
          </li>
          <li>
            <a href="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
              <span className="ml-2 text-sm tracking-wide truncate">Inbox</span>
              <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-indigo-500 bg-indigo-50 rounded-full">New</span>
            </a>
          </li>
          <li>
            <a href="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
              <span className="ml-2 text-sm tracking-wide truncate">Messages</span>
            </a>
          </li>
          <li>
            <a href="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
              <span className="ml-2 text-sm tracking-wide truncate">Notifications</span>
              <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-red-500 bg-red-50 rounded-full">1.2k</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
  )
}

};

export default Sidebar;