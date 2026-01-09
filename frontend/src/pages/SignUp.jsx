import React, { useState } from 'react';
import api from '../api/axios';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, Smartphone } from 'lucide-react';
import { toast } from 'react-hot-toast';
import logo from '../assets/note.png';

export default function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    setLoading(true);
    try {
      await api.post('/auth/signup', formData);
      toast.success("Sign-up Successful, You'r in");
      navigate('/login');
    } catch (error) {
      toast.error("Signup failed, Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-black/5 gap-3">
      <img src={logo} alt="logo" className='w-16 h-16 bg-black rounded-xl p-0.5' />
      <div className='flex flex-col justify-center items-center gap-1'>
        <h3 className="font-semibold text-2xl">QuickNote</h3>
        <p className="text-gray-600">Organize your thoughts, amplify your productivity</p>
      </div>
      <div className="flex flex-col w-105 p-8 pb-3 pt-4 mt-2 rounded-xl bg-white shadow-xl">
        <h3 className="font-bold text-2xl">Create Your Account</h3>

        <form onSubmit={handleSubmit} className="mt-5 w-full flex flex-col gap-5">
          <div className="relative">
            <User
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <input 
              name="name" 
              placeholder="Enter Name" 
              required 
              onChange={handleChange} 
              className="w-full h-10 pl-10 pr-3 rounded-lg bg-gray-100 outline-gray-300 text-sm" />
          </div>
          <div className="relative">
            <Mail
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input 
              type="email" 
              name="email" 
              placeholder="Enter Email" 
              required 
              onChange={handleChange} 
              className="w-full h-10 pl-10 pr-3 rounded-lg bg-gray-100 outline-gray-300 text-sm" 
            />
          </div>
          <div className="relative">
            <Lock
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Password"
              required
              onChange={handleChange}
              className="w-full h-10 pl-10 pr-3 rounded-lg bg-gray-100 outline-gray-300 text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <div className="relative">
            <Lock
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input 
              type="password" 
              name="confirmPassword" 
              placeholder="Re-enter Password" 
              required 
              onChange={handleChange} 
              className="w-full h-10 pl-10 pr-3 rounded-lg bg-gray-100 outline-gray-300 text-sm" 
            />
          </div>
          <div className="relative">
            <Smartphone
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input 
              name="phone" 
              placeholder="Enter Phone Number" 
              required 
              onChange={handleChange} 
              className="w-full h-10 pl-10 pr-3 rounded-lg bg-gray-100 outline-gray-300 text-sm" 
            />
          </div>
          <div className='flex flex-col gap-1'>
            <button
              disabled={loading}
              className={`h-10 text-white rounded-lg font-bold 
              ${loading ? 'bg-black cursor-not-allowed' : 'cursor-pointer bg-black hover:opacity-90'}`}
            >
              {loading ? 'Creating account...' : 'Register'}
            </button>
            <p className='text-center text-sm mt-2 text-gray-600 font-semibold'>
              Already a user?{' '}
              <Link to="/login" className="font-bold underline text-black">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
