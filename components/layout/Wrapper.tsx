import React from 'react'

const Wrapper = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='px-[7.5%] md:px-[10%] lg:px-[12.5%]'>
        {children}
    </div>

  )
}

export default Wrapper