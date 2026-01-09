import React, { useState } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { toast } from 'react-hot-toast';
import logo from '../assets/note.png';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/auth/forgot-password', { email });
      toast.success('If email exists, reset link has been sent.');
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
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
        <h3 className="text-2xl font-bold">Forgot Password</h3>

        <form onSubmit={handleSubmit} className="mt-5 w-full flex flex-col gap-5">
          <div className='flex flex-col gap-1 text-sm'>
            <label className='font-semibold'>Your Email</label>
            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
                required
                className="w-full h-10 pl-10 pr-3 rounded-lg bg-gray-100 outline-gray-300"
              />
            </div>
          </div>
          <div className='flex flex-col gap-1'>
            <button
              disabled={loading}
              className={`h-10 text-white rounded-lg font-bold 
              ${loading ? 'bg-black cursor-not-allowed' : 'cursor-pointer bg-black hover:opacity-90'}`}
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
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
