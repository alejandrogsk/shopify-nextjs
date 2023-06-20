import Wrapper from '@/components/layout/Wrapper'
import React from 'react'

const page = () => {
  return (
    <Wrapper>
        <div className='grid-cols-1'>
            <h1 className='font-semibold text-3xl py-12'>Complete you purchase</h1>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_400px] gap-4 md:gap-8 lg:gap-12 '>
                <div className='flex flex-col overflow-hidden'>
                    <CartProduct />
                    <CartProduct />
                    <CartProduct />
                    <CartProduct />
                    <CartProduct />
                    <div className='flex justify-between'>
                        <span>Total:</span>
                        <span>$200</span>
                    </div>
                </div>

                <div>
                    <h3>Payment data</h3>

                </div>
            </div>
        </div>
    </Wrapper>
  )
}

const CartProduct = () => {

    return(
        <div className='border-b-[1px] border-black grid grid-cols-[100px_1fr_80px] w-full'>
            <div>Image</div>
            <div>Title, description</div>
            <div>Quantity:1</div>
        </div>
    )
}

export default page