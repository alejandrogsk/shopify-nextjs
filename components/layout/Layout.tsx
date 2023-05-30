import React from 'react'
import Menu from './Menu'

const Layout = ({children}:{children:React.ReactNode}) => {
  return (
    <main className='min-h-screen px-[7.5%] md:px-[10%] lg:px-[12.5%]'>
        {children}
    </main>

  )
}

export default Layout