"use client";



export const SignUpForm = () => {
    return(
    <div>
      <form className='flex flex-col gap-4 '>
        <h1>Create an account</h1>
        <div className="flex flex-col">
          <label htmlFor='userName' className='text-gray-400 text-sm'>Name</label>
          <input className='p-2 border-black border-2 bg-white placeholder:text-gray-400'  name='userName' id='userName' type='text' placeholder='johndoe@gmail.com' required />
        </div>
  
        <div className="flex flex-col">
          <label htmlFor='userLastName' className='text-gray-400 text-sm'>Last Name</label>
          <input className='p-2 border-black border-2 bg-white placeholder:text-gray-400'  name='userLastName' id='userLastName' type='text' placeholder='johndoe@gmail.com' required />
        </div>
  
        <div className="flex flex-col">
          <label htmlFor='userEmail' className='text-gray-400 text-sm'>Email</label>
          <input className='p-2 border-black border-2 bg-white placeholder:text-gray-400'  name='userEmail' id='userEmail' type='email' placeholder='johndoe@gmail.com' required />
        </div>
  
        <div className="flex flex-col">
          <label htmlFor='userPassword' className='text-gray-400 text-sm'>Password</label>
          <input className='p-2 border-black border-2 bg-white placeholder:text-gray-400' name='userPassword' id='userPassword' type='password' placeholder='!23OPE1sfrw2341s%' required min={8} max={16} />
        </div>
  
        <div className='pt-4'>
          <button className='p-2 border-2 border-black text-black hover:text-white hover:bg-[#1A1A1A] hover:border-[#1A1A1A] uppercase w-full md:w-auto'>Sign Up</button>
        </div>
      </form>
  
  </div>
  )
  }
  
  export const SignInForm = () => {
  return(
    <div>
              <form className='flex flex-col gap-4 '>
                <h2>Welcome Back</h2>
                <div className="flex flex-col">
                  <label htmlFor='userEmail' className='text-gray-400 text-sm'>Email</label>
                  <input className='p-2 border-black border-2 bg-white placeholder:text-gray-400'  name='userEmail' id='userEmail' type='text' placeholder='johndoe@gmail.com' required />
                </div>
  
                <div className="flex flex-col">
                  <label htmlFor='userPassword' className='text-gray-400 text-sm'>Password</label>
                  <input className='p-2 border-black border-2 bg-white placeholder:text-gray-400' name='userPassword' id='userPassword' type='password' placeholder='!23OPE1sfrw2341s%' required min={8} max={16} />
                </div>
  
                <div className='pt-4'>
                  <button className='p-2 border-2 border-black text-black hover:text-white hover:bg-[#1A1A1A] hover:border-[#1A1A1A] uppercase w-full md:w-auto'>Sign In</button>
                </div>
              </form>
  
           </div>
  )
  }
  