"use client"
import { useTransition } from 'react';
import { addItem } from './actions';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '../LoadingSpinner';

export const AddToCart = ({productId}:{productId: string}) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

  return (
    <button onClick={() => {
        startTransition(async () => {
            await addItem(productId);
            //Should handle errors here
            router.refresh();
        })
    }} className='p-2 bg-cyan-200 hover:bg-cyan-400 block max-w-[300px]'>
        {
            isPending ? <LoadingSpinner size={4} /> : "Add To Cart"
        }
    </button>
  )
}

