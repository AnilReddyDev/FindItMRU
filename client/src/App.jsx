import React from 'react'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import axios from 'axios'
import Home from './Pages/Home';
import SignIn from './Components/SignIn';
import Header from './Components/Header';
import Listings from './Pages/Listings';
import FormPage from './Pages/FormPage';
import ProfilePage from './Pages/ProfilePage';

// axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;
export default function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route index path="/" element={<Home/>}/>
      <Route path="/additem" element={<FormPage/>}/>
      <Route path="/SignIn" element={<SignIn/>}/>
      <Route path="/profile/:id" element={<ProfilePage/>}/>
      <Route path="/listings" element={<Listings/>}/>
    </Routes>

   </BrowserRouter>
  );
}
