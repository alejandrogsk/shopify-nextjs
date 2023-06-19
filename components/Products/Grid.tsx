import { Product } from '@/types/Product'
import React from 'react'
import Card from './Card'

const Grid = ({edges}: { edges: {node: Product}[]}) => {
  return (
    <div className='grid grid-cols-2 lg:grid-cols-3 w-full max-w-[1200px] mx-auto gap-x-8 gap-y-[100px] my-8 lg:my-20'>
        {
            edges.map((edge) => <Card key={edge.node.id} product={edge.node} />)
        }
    </div>
  )
}

export default Grid