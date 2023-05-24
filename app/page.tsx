import { getAllProducts } from '@/lib/shopify'
import { Product } from '@/types/Product';
import Image from "next/image"
const getData = async () => {
  const req = await getAllProducts()
  if( req.status !== 200){
    throw new Error('Failed to fetch data');
  }
  console.log("server req: ", req.body)

  return req.body
}


export default async function Home() {
  const { data } = await getData()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Title</h1> 
      {
        !data.products ? <div>No data</div> : <div className='grid grid-cols-3'>
          {
            data.products.edges.map((edge:{ node: Product })=> {

                const {
                  // id, 
                 // featuredImage, 
                  title, description, 
                 // priceRangeV2 
                } = edge.node;
              return(
                <div key={id}>
                  <div className='w-full height-[300px]'>
                  {/* <Image alt={`${title} image`} src={featuredImage.src} width={900} height={1200} className='h-auto w-full margin-4' /> */}
                    </div>
                  <h2>{title}</h2>
                  {/* <span>${(priceRangeV2.minVariantPrice.amount !== "0.0") ? priceRangeV2.minVariantPrice.amount : priceRangeV2.maxVariantPrice.amount}</span> */}
                  <p>{description}</p>

                </div>
              )
            })
          }
        </div>
      }
    </main>
  )
}
