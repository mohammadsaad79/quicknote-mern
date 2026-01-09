import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { Link } from 'react-router-dom';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-hot-toast';
import logo from '../assets/note.png';

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error('Passwords do not match');
    }

    setLoading(true);
    try {
      await api.post(`/auth/reset-password/${token}`, {
        password,
        confirmPassword
      });
      toast.success("New Password Created");
      navigate('/login');
    } catch (error) {
      toast.error('Password Reset failed');
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
      <div className='flex flex-col w-105 p-8 pb-3 pt-4 mt-2 rounded-xl bg-white shadow-xl'>
        <h3 className="text-2xl font-bold">Reset Password</h3>

        <form onSubmit={handleSubmit} className="mt-5 w-full flex flex-col gap-5">
          <div className='flex flex-col gap-1 text-sm'>
            <label className='font-semibold'>Password</label>
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New Password"
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
          </div>
          <div className='flex flex-col gap-1 text-sm'>
            <label className='font-semibold'>Confirm Password</label>
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className="w-full h-10 pl-10 pr-10 rounded-lg bg-gray-100 outline-gray-300"
              />
            </div>
          </div>
          <div className='flex flex-col gap-1'>
            <button
              disabled={loading}
              className={`h-10 text-white rounded-lg font-bold 
              ${loading ? 'bg-black cursor-not-allowed' : 'cursor-pointer bg-black hover:opacity-90'}`}
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
            <p className="text-center text-sm mt-2 text-gray-600 font-semibold">
              Back to{' '}
              <Link to="/login" className="underline font-bold text-black">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
