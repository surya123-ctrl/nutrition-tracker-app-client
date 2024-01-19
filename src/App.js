import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import Login from './components/Login';
import NotFound from './components/NotFound';
import Track from './components/Track';
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/track" element={<Track />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  )
}

export default App
