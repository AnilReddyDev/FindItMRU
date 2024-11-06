import React from 'react'
import dog_404 from '../Assets/404_dog.webp'
import { useNavigate } from 'react-router-dom'
export default function LostPage() {
    const navigate = useNavigate();
  return (
    <div className="flex flex-col text-white justify-center items-center  min-h-screen poppins  box-border w-full bg-gradient-to-t from-primary/[0.90] to-primary  ">

     <img src={dog_404} className='w-2/5' alt="404 - Page not found"  />
    <h1 className='text-3xl font-semibold pt-8 pb-4' >Why are you here?</h1>
    <p className='text-white/85 text-base'>You’re not supposed to be here.</p>
    <button onClick={() => navigate("/")} className="bg-primary-light  text-secondary py-2 px-4  font-normal text-lg rounded-md mt-8"> Go home</button>
    </div>
  )
}
