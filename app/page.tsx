import Card from '@/components/Products/Card';
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
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Title</h1> 
      <Grid edges={data.edges} />
    </div>
  )
}
