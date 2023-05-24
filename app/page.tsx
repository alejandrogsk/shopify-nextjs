import { getAllProducts } from '@/lib/shopify'
import { Product } from '@/types/Product';
import Image from "next/image"

export type ReqAllPropducts = {
  status: number;
  body: {
    data: {
      products: {
        edges: {
          node: Product
        }
      }
    }
  }
}

const getData = async () => {
  const req = await getAllProducts()
  if( req.status !== 200){
    throw new Error('Failed to fetch data');
  }
  return req.body.data.products
}

// export const gtOP = async () => {
// //const id = "gid://shopify/Product/8377766707510"
// let handle="balcones-2016"
//  const probando = await  getOneeeeProduct(handle)
//  console.log("la pruebita", probando)
//  console.log("el resultado es:", probando?.body.data.product.title)
// }


export default async function Home() {
  const data = await getData()

 // await gtOP()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Title</h1> 
      <div className='grid grid-cols-2 lg:grid-cols-3 w-full max-w-[1200px] mx-auto gap-x-4 gap-y-[100px]'>

     {
       data.edges.map((edge) => {
        let { title, featuredImage, priceRange,handle } = edge.node;
        return(
          <div key={title} className='grid grid-row-[200px_1fr_30px] gap-2 max-w-[300px] px-2 py-3 border-black border-[1px]'>
            <div className='h-[200px] lg:h-[300px] w-full grid justify-center'>
              <Image
                src={featuredImage.url}
                alt={featuredImage.altText}
                width={featuredImage.width}
                height={featuredImage.height}
                className='w-auto h-[200px] lg:h-[300px]'
              />
            </div>  
            <span className='w-full bg-black h-[1px]'></span>
            <div className='flex justify-between flex-col lg:flex-row text-lg font-medium'>
              <h2 >{title}</h2>

              <span>${priceRange.minVariantPrice.amount}</span>
            </div>
            <div>Handle: {handle}</div>
            <button
            className='w-full bg-black text-white mt-auto h-full h-[30px]'
            >View More</button>
          </div>
        )
      })
    }
    </div>
    </main>
  )
}
