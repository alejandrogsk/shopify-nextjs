import { Product } from '@/types/Product'
import React from 'react'
import Card from './Card'

const Grid = ({edges}: { edges: {node: Product}[]}) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full  gap-x-2 md:gap-x-4 lg:gap-x-8 gap-y-4 md:gap-y-8 lg:gap-y-12 my-4 md:my-8 lg:my-12'>
        {
            edges.map((edge) => <Card key={edge.node.id} product={edge.node} />)
        }
    </div>
  )
}

export default Grid