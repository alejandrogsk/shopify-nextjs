import CartProduct from '@/components/Cart/CartProducts';
import PaymentDetail from '@/components/Cart/PaymentDetail';
import Wrapper from '@/components/layout/Wrapper'
import { getCart } from '@/lib/shopify/functions/cart';
import { cookies } from 'next/headers';
import Link from 'next/link';
import React from 'react'
async function getCartData() {
    let cartId = cookies().get('cartId')?.value;
    if(!cartId) return null;
    return await getCart(cartId)
}
const page = async () => {
    const cartData = await getCartData()
    if(!cartData || cartData.body.data.cart.totalQuantity === 0){
        return(
            <div className='h-[90vh] flex flex-col items-center justify-center'>
                <h4 className=''>Your Cart Is Empty</h4>
                <h1 >
                    <Link className='text-2xl underline cursor-ponter mt-4' href="/">Find the best whiskey here</Link>
                </h1>
            </div>
        )
    }
    
    const { lines, cost, checkoutUrl } = cartData?.body?.data?.cart
console.log('checkoutUrl', checkoutUrl)
  return (
    <Wrapper>
        <div className='grid-cols-1 min-h-[90vh]'>
            <h1 className='font-semibold text-3xl py-12'>Complete your purchase</h1>
            {/* <span className='text-red-600 text-6xl'>Checkout URL: {checkoutUrl}</span> */}
            <div className='grid grid-cols-1  lg:grid-cols-[1fr_400px] gap-4 md:gap-8 lg:gap-12'>
                <div className='flex flex-col overflow-hidden'>
                    {
                        lines.edges.map(({node}) => {
                            return <CartProduct node={node}/>
                        } )
                    }
                </div>
                <PaymentDetail cost={cost} checkoutUrl={checkoutUrl} />
            </div>
        </div>
    </Wrapper>
  )
}






export default page