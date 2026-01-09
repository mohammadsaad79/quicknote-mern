import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import ProtectedRoute from "./routes/ProtectedRoute";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import CreateNote from "./pages/CreateNote";
import ViewNote from "./pages/ViewNote";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ContactUs from "./pages/ContactUs";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";

import { AuthContext } from "./context/AuthContext";

export default function App() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-200">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-center" />

      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/notes" /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route element={<Layout />}>
          <Route path="/notes" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/notes/:id" element={<ProtectedRoute><ViewNote /></ProtectedRoute>} />
          <Route path="/create-note" element={<ProtectedRoute><CreateNote /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/contact" element={<ContactUs />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
