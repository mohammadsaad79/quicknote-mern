import React, { useEffect, useState } from "react";
import { CalendarDays, FileText, Pin, Save, Shield, Trash2, X, TriangleAlert } from 'lucide-react';
import Navbar from "../components/Navbar";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [stats, setStats] = useState({
    totalNotes: 0,
    pinnedNotes: 0,
    thisMonthNotes: 0,
  });

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "",
    phone: user?.phone || "",
    bio: user?.bio || "",
    avatar: user?.avatar || "",
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    api.get('/notes/stats')
      .then(res => {
        setStats(res.data);
      })
      .catch((err) => {
        console.error(err);
        toast.error('Failed to load stats');
      });
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      month: 'long',
      year: 'numeric',
    });
  };

  const updateProfile = async () => {
    try {
      const res = await api.put("/auth/profile", form);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
      toast.success('Profile updated')
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const deleteAccount = async () => {
    try {
      await api.delete("/auth/delete-account");
      localStorage.clear();
      toast.success('Account deleted')
      navigate("/login");
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setShowDeleteModal(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="absolute z-50 mt-20 p-8 pl-40 pr-40 w-full h-auto bg-black/5 flex flex-col gap-5">
        <div>
          <h1 className="font-semibold text-2xl">Profile Settings</h1>
          <p className="mt-2 text-gray-600">Manage your account and preferences</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-8 flex flex-col gap-5">
          <div className="flex gap-8 items-center border-b border-gray-300 pb-12">
            <img
              src={user?.avatar || "https://via.placeholder.com/150"}
              alt="profile"
              className="w-30 h-30 rounded-xl border object-cover"
            />
            <div className="flex-1">
              <h2 className="text-xl font-bold">{user?.name}</h2>
              <p className="mt-1">{user?.role}</p>
              <p className="text-sm mt-3 text-gray-600">{user?.bio}</p>
              <small className='mt-1 flex items-center gap-1 text-gray-600'>
                <CalendarDays size={16} />Joined {formatDate(user?.createdAt)}
              </small>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-8 pt-5">
            <div className="rounded-xl flex flex-col justify-center text-blue-800 items-center gap-5 p-5 bg-blue-100">
              <FileText size={30} color="blue" />
              <h2 className="font-semibold text-xl">{stats.totalNotes}</h2>
              <p>Total Notes</p>
            </div>
            <div className="rounded-xl flex flex-col justify-center text-violet-950 items-center gap-5 p-5 bg-violet-100">
              <Pin size={30} color="indigo" />
              <h2 className="font-semibold text-xl">{stats.pinnedNotes}</h2>
              <p>Pinned</p>
            </div>
            <div className="rounded-xl flex flex-col justify-center text-orange-400 items-center gap-5 p-5 bg-orange-100">
              <CalendarDays size={30} color="orange" />
              <h2 className="font-semibold text-xl">{stats.thisMonthNotes}</h2>
              <p>This Month</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-8 flex flex-col gap-8">
          <h2 className="font-semibold text-xl">Personal Information</h2>
          <div className="grid grid-cols-2 gap-8">
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Name"
              className="h-10 p-4 rounded-lg bg-gray-200 shadow-sm outline-gray-300"
            />
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Email"
              className="h-10 p-4 rounded-lg bg-gray-200 shadow-sm outline-gray-300"
            />
          </div>
          <div className="grid grid-cols-2 gap-8">
            <input
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              placeholder="Role (e.g. Full Stack Developer)"
              className="h-10 p-4 rounded-lg bg-gray-200 shadow-sm outline-gray-300"
            />
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="Phone"
              className="h-10 p-4 rounded-lg bg-gray-200 shadow-sm outline-gray-300"
            />
          </div>
          <textarea
            rows={3}
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            placeholder="Tell us about yourself..."
            className="w-full h-30 p-2 pl-4 rounded-lg bg-gray-200 shadow-sm outline-gray-300 resize-none">
          </textarea>
          <input
            className="w-full h-10 p-4 rounded-lg bg-gray-200 shadow-sm outline-gray-300"
            placeholder="Profile Image URL"
            value={form.avatar}
            onChange={(e) => setForm({ ...form, avatar: e.target.value })}
          />
          <div className="flex justify-end">
            <button
              onClick={updateProfile}
              className="px-4 h-9 font-bold rounded-lg bg-black flex gap-2 items-center text-sm cursor-pointer text-white hover:opacity-90">
              <Save size={18} />Save Changes
            </button>
          </div>
        </div>

        <div className="bg-white border border-gray-200 text-red-600 rounded-xl p-8 flex flex-col gap-5">
          <h2 className="text-red text-xl font-semibold flex gap-2 items-center">
            <Shield />Danger Zone
          </h2>
          <div className="mt-8 border border-red-200 rounded-lg bg-red-50 flex justify-between p-5">
            <div className="pr-4">
              <h3 className="text-red-950">Delete Your Account</h3>
              <small className="text-sm">Once you delete your account, there is no going back. Please be certain.</small>
            </div>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="hover:text-white hover:bg-red-600 font-semibold border cursor-pointer border-red-300 p-4 h-10 bg-white rounded-lg flex items-center gap-2 justify-center">
              <Trash2 size={18} />Delete Account
            </button>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 flex flex-col gap-2 w-120 shadow-xl">
            <div className='flex justify-between'>
              <h3 className="text-lg font-bold mb-3">Are you sure you want to do this?</h3>
              <X size={18} onClick={() => setShowDeleteModal(false)} className='hover:bg-gray-300 rounded-sm cursor-pointer' />
            </div>
            <div className="border border-red-400 rounded-xl bg-red-100 p-4 flex gap-3 items-center">
              <TriangleAlert size={20} color="red" />
              <p>This is extremely important.</p>
            </div>
            <p className="text-gray-600">
              {`This will permanently delete the account and all of notes from this user.`}
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 h-9 rounded-lg border text-sm cursor-pointer hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={deleteAccount}
                className="px-6 h-9 rounded-lg bg-red-600 text-white text-sm cursor-pointer hover:bg-red-700"
              >
                Delete This Account
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}