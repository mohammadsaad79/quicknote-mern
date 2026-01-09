import React, { useState, useContext } from 'react';
import api from '../api/axios';
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Mail, Eye, EyeOff, Lock } from "lucide-react";
import logo from '../assets/note.png';

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post('/auth/login', { email, password });
      login(res.data.user, res.data.token);
      toast.success("Login successful");
      navigate('/notes');
    } catch (error) {
      toast.error("Login failed, Invalid email or password")
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
      <div className="flex flex-col w-105 p-7 pb-3 pt-4 mt-2 rounded-xl bg-white shadow-xl">
        <h3 className="font-bold text-2xl">Login to Your Account</h3>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
          <div className="flex flex-col gap-1 mt-5 text-sm">
            <label className="font-semibold">Your Email</label>
            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-full h-10 pl-10 pr-3 rounded-lg bg-gray-100 outline-gray-300"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1 text-sm">
            <label className="font-semibold">Your Password</label>
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full h-10 pl-10 pr-10 rounded-lg bg-gray-100 outline-gray-300"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="flex justify-end mt-1">
              <Link
                to="/forgot-password"
                className="text-gray-800 font-semibold hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <div className='flex flex-col gap-1'>
            <button
              disabled={loading}
              className={`h-10 text-white rounded-lg font-bold 
              ${loading ? 'bg-black cursor-not-allowed' : 'cursor-pointer bg-black hover:opacity-90'}`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <p className='text-center text-sm mt-2 text-gray-600 font-semibold'>
              Don't have an account?{' '}
              <Link to="/signup" className="font-bold underline text-black">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
