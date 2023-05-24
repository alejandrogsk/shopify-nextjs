import React from 'react'
export async function generateMetadata(){
    return{
        title: "Product Page",
        description: "Some page"
    }
}
export default function Product() {
  return (
    <div className='relative h-screen'>


        <h1 className='text-black'>Esta es la pagina en cuestion</h1>
    </div>
  )
}

