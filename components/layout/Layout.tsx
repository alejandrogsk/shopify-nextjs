import React from 'react'

const Layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='min-h-screen px-[7.5%] md:px-[10%] lg:px-[12.5%]'>
        {children}
    </div>
  )
}

export default Layout