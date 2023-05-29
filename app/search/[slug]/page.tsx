import Grid from '@/components/Products/Grid';
import getCollection from '@/lib/shopify/queries/collections';

export async function generateMetadata({ params }:{params:{slug:string}}){
  const req = await getCollection(params.slug, 10, null)
  const { title, description}=req.body.data.collection.seo;
  return{
    title: title ?? "Product Page",
    description: description ?? "Some page"
  }
}

async function getData(slug: string) {
  const req = await getCollection(slug, 10, null)
  if(req.status !== 200){
    throw new Error('Failed to fetch data'); 
  }
  return req.body.data.collection
}

export default async function Product({ params }:{
  params: { slug: string }
}) {
  const { slug } = params;
  const collection = await getData(slug)
  return (
    <div className='relative h-screen'>
        <h1 className='text-black text-5xl'>This collection is called: {collection.title}</h1>
        <p>{collection.description}</p>
    
        <Grid  edges={collection.products.edges}/>


    </div>
  )
}

