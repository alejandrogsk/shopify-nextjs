import Banner from '@/components/Home/Banner';
import Grid from '@/components/Products/Grid';
import Wrapper from '@/components/layout/Wrapper';
import { getPageByID } from '@/lib/shopify/queries/pages';
import { getAllProducts } from '@/lib/shopify/queries/product';
const getData = async () => {
  const reqPage = await getPageByID("gid://shopify/Page/118707159350")
  if( reqPage.status !== 200){
    throw new Error('Failed to fetch Home page data');
  }
  const reqProducts = await getAllProducts()
  if( reqProducts.status !== 200){
    throw new Error('Failed to fetch products data');
  }
  const homePage = reqPage.body.data.page
  const products = reqProducts.body.data.products;
  return {
    homePage,
    products
  }
}

export default async function Home() {
  const { homePage,
    products} = await getData()

  return (
      
    <div className="font-oswald">
      <Banner title={homePage.title} body={homePage.body}/>
      <Wrapper customStyle='my-4 md:my-8 lg:my-12'>
      <Grid edges={products.edges} />
      </Wrapper>
    </div>
  )
}
