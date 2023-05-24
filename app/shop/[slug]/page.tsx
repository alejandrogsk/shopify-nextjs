import { getAllProducts, getProductByHandle } from '@/lib/shopify';
import React from 'react'
export async function generateMetadata(){
    return{
        title: "Product Page",
        description: "Some page"
    }
}

export async function generateStaticParams() {
  const req = await getAllProducts()
  const products = req.body.data.products
  return products.edges.map((item) => ({
    slug: item.node.handle
  }));
}


const getProductData = async (handle:string) => {
  return await getProductByHandle(handle)
}
export default async function Product({ params }:{
  params: { slug: string }
}) {
  const { slug } = params;
  const product = await getProductData(slug)
  console.log("Product Page: ", product)
  return (
    <div className='relative h-screen'>
        <h1 className='text-black'>Esta es la pagina de producto {slug}</h1>
    </div>
  )
}

