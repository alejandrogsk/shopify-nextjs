import Grid from '@/components/Products/Grid';
import Wrapper from '@/components/layout/Wrapper';
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
    <Wrapper>

    <div className='relative  py-20'>
        <div className='mb-12'>
        <h1 className='text-black text-3xl md:text-4xl lg:text-5xl'>Find the best {collection.title} whiskey</h1>
        <p className='mt-4'>{collection.description}</p>
        </div>
    
        <Grid  edges={collection.products.edges}/>


    </div>
    </Wrapper>
  )
}

