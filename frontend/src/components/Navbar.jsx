import { Plus, Search, CircleUser, Settings, LogOut } from 'lucide-react';
import { useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { NavLink } from "react-router-dom";
import logo from "../assets/note.png";

const navigation = [
  { name: 'Home', href: '/notes' },
  { name: 'Profile', href: '/profile' },
  { name: 'Contact', href: '/contact' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar({ value, onChange }) {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <nav className="bg-white w-full flex justify-between p-2 z-100 fixed">
      <div className='flex gap-4 items-center pl-5'>
        <img src={logo} alt="logo" className='w-12 h-12' />
        <div>
          <h3 className="font-bold text-2xl">QuickNote</h3>
          <p className="font-semibold text-gray-600">Welcome, {' '}
            <span className='font-semibold text-black'>{user?.name}</span>
          </p>
        </div>
      </div>

      <div className="flex gap-8 justify-center items-center">
        <div className="flex space-x-4">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                classNames(
                  isActive
                    ? "border-b-2 border-black text-black"
                    : "text-gray-700 hover:border-b-2 hover:border-black hover:text-black",
                  "px-3 py-2 font-semibold transition-all duration-300"
                )
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="flex gap-6 items-center pr-5">
        <div className="relative w-80">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search notes..."
            className="w-full h-10 pl-10 pr-4 bg-gray-200 rounded-lg outline-gray-300"
          />
        </div>
        <Link to='/create-note'>
          <button className='p-5 h-10 font-bold rounded-lg bg-black flex gap-2 items-center text-sm cursor-pointer text-white hover:opacity-90'>
            <Plus size={19} />Create Note
          </button>
        </Link>
        <div className='relative group'>
          <CircleUser size={35} strokeWidth={1} className='cursor-pointer' />
          <div className="absolute right-0 mt-2 w-50 bg-white text-gray-800 border border-gray-300 opacity-0 invisible rounded-lg shadow-sm group-hover:opacity-100 group-hover:visible transition-all 200">
            <Link to={'/profile'} className="px-4 py-2 flex gap-2 items-center hover:bg-gray-200 rounded-lg">
              <Settings size={18} />Setting
            </Link>
            <button onClick={handleLogout} className="w-full text-left px-4 py-2 flex gap-2 cursor-pointer items-center hover:bg-gray-200 rounded-lg text-red-600">
              <LogOut size={18} />Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
