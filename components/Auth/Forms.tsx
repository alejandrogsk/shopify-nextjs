"use client";
import React, { useState } from 'react'

const Forms = () => {
    const [ toggleForms, setToggleForms ] = useState<boolean>(true)
  return (
    <>
    {
          toggleForms ? <SignInForm changeForm={setToggleForms} /> : <SignUpForm changeForm={setToggleForms} />
        }
        </>
  )
}

export default Forms


const SignUpForm = ({changeForm}: {changeForm: React.Dispatch<boolean>}) => {
    return(
    <div>
      <form className='flex flex-col gap-4 px-[10%]'>
        <h1>Sign Up</h1>
        <div className="flex flex-col">
          <label htmlFor='userName' className='text-gray-400 text-sm'>Name</label>
          <input className='p-2 border-black border-2 bg-white text-gray-300'  name='userName' id='userName' type='text' placeholder='johndoe@gmail.com' required />
        </div>
  
        <div className="flex flex-col">
          <label htmlFor='userLastName' className='text-gray-400 text-sm'>Last Name</label>
          <input className='p-2 border-black border-2 bg-white text-gray-300'  name='userLastName' id='userLastName' type='text' placeholder='johndoe@gmail.com' required />
        </div>
  
        <div className="flex flex-col">
          <label htmlFor='userEmail' className='text-gray-400 text-sm'>Email</label>
          <input className='p-2 border-black border-2 bg-white text-gray-300'  name='userEmail' id='userEmail' type='email' placeholder='johndoe@gmail.com' required />
        </div>
  
        <div className="flex flex-col">
          <label htmlFor='userPassword' className='text-gray-400 text-sm'>Password</label>
          <input className='p-2 border-black border-2 bg-white text-gray-300' name='userPassword' id='userPassword' type='password' placeholder='!23OPE1sfrw2341s%' required min={8} max={16} />
        </div>
  
        <div className='pt-4'>
          <button className='p-2 border-2 border-black text-black hover:text-white hover:bg-[#1A1A1A] hover:border-[#1A1A1A]'>Sign In</button>
        </div>
      </form>
  
      <span>or <div className='cursor-pointer' onClick={() => changeForm(true)}>SignIn</div></span>
  </div>
  )
  }
  
  const SignInForm = ({changeForm}: {changeForm: React.Dispatch<boolean>}) => {
  return(
    <div>
              <form className='flex flex-col gap-4 px-[10%]'>
                <h1>Sign In</h1>
                <div className="flex flex-col">
                  <label htmlFor='userEmail' className='text-gray-400 text-sm'>Email</label>
                  <input className='p-2 border-black border-2 bg-white text-gray-300'  name='userEmail' id='userEmail' type='text' placeholder='johndoe@gmail.com' required />
                </div>
  
                <div className="flex flex-col">
                  <label htmlFor='userPassword' className='text-gray-400 text-sm'>Password</label>
                  <input className='p-2 border-black border-2 bg-white text-gray-300' name='userPassword' id='userPassword' type='password' placeholder='!23OPE1sfrw2341s%' required min={8} max={16} />
                </div>
  
                <div className='pt-4'>
                  <button className='p-2 border-2 border-black text-black hover:text-white hover:bg-[#1A1A1A] hover:border-[#1A1A1A]'>Sign In</button>
                </div>
              </form>
  
              <span>or <div className='cursor-pointer' onClick={() => changeForm(false)}>Create an account</div></span>
          </div>
  )
  }
  