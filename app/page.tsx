import Grid from '@/components/Products/Grid';
import { getAllProducts } from '@/lib/shopify/queries/product';
const getData = async () => {
  const req = await getAllProducts()
  if( req.status !== 200){
    throw new Error('Failed to fetch data');
  }
  return req.body.data.products
}

export default async function Home() {
  const data = await getData()

  return (
      
    <div className=" py-20">
      <h1>Title</h1> 
      <Grid edges={data.edges} />
    </div>
  )
}
