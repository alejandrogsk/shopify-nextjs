import React from 'react'

const Wrapper = ({children, customStyle}:{children:React.ReactNode, customStyle?:string}) => {
  return (
    <div className={`px-4 md:px-8 lg:px-12 ${customStyle && customStyle}`}>
        {children}
    </div>

  )
}

export default Wrapper