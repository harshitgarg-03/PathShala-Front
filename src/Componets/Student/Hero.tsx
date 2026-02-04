import React from 'react'
import Heroimg from '../../assets/Hero.png'
import Button from '../ReuseCompo/Button'
import "../../index.css"
function Hero() {
  return (
    <div className={`flex px-18 justify-between min-w-screen`}>
        <div className={`h-128 w-auto flex justify-center gap-2 pl-8 flex-col`}>
            <h1 className={`text-6xl font-semibold leading-18 mb-4`} >Empower Your Learning Journey</h1>
            <p className={`text-gray-600`} >Explore high-quality courses and advance your skills </p>
            <div className={`flex gap-4 mt-10`}>
                <Button title='Explore Courses' classname='bg-green-500 font-semibold text-lg w-50 font-sans text-white'/>
                <Button title='Get Started'classname='bg-blue-800 font-semibold w-50 font-sans text-white'/>
            </div>
        </div>
        <img src={Heroimg} alt="Hero" className={`w-auto h-132`} />
    </div>
  )
}

export default Hero