import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import Login from './components/Login';
import NotFound from './components/NotFound';
import Track from './components/Track';
import { AuthContext } from './contexts/AuthContext';
import Private from './components/Private';
import Navbar from './components/Navbar';
import TrackFoodByDate from './components/TrackFoodByDate';

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(localStorage.getItem("nutrition-tracker-user")));

  return (
    <>
      <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/track" element={<Private Component={Track} />} />
            <Route path="/trackFoodByDate" element={<Private Component={TrackFoodByDate} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  )
}

export default App
