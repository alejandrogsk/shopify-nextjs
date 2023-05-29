"use client";
import React, { useEffect, useState } from 'react'

const Cart = () => {
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    setTimeout(() => {
        setIsVisible(true)
    },2000)
  },[])  

  const handleClose = () => {
    setTimeout(() => {
        setIsVisible(false)
    },500)
  }
  return (
    <div className={`fixed top-0 bottom-0 right-0 border-black border-l-[1px]  w-[12.5rem] lg:w-[25rem] bg-white text-black text-4xl
    transition-all duration-500 
    ${isVisible ? "translate-x-0" : "translate-x-[25rem]"}
    `}>Cart
        <button onClick={handleClose}>Close</button>
    </div>
  )
}

export default Cart