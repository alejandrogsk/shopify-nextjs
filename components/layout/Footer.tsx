import React from 'react'

const Footer = () => {
    const date = new Date();
  return (
    <footer className='flex items-center justify-center bg-black py-12 md:py-16 mt-12 md:mt-16'>
        <span className='text-white'>
            Copyright - Brown And Brothers - {date.getFullYear()}
        </span>
    </footer>
  )
}

export default Footer