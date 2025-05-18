import React from 'react'
import video from '../assets/vecteezy_man-use-phone-on-car-vmake.mp4'
import loader from "../assets/loader.gif"
const LoadingPage = () => {
  return (
    <div className='min-h-screen min-w-screen bg-custom-gradient flex flex-col justify-center items-center'>
        <video className='w-96 h-80 motion-preset-bounce ' src={video} autoPlay loop muted ></video>
        <h1 className='text-3xl motion-duration-2000  '>Looking...</h1>
        <img src={loader} alt="loader" className='w-32 h-16' />
    </div>
  )
}

export default LoadingPage