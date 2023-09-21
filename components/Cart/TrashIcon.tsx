"use client";
import Image from 'next/image'
import React, { useTransition } from 'react'
import { removeItem } from './actions'
import { useRouter } from 'next/navigation';
import LoadingSpinner from '../LoadingSpinner';

const TrashIcon = ({productId}:{productId: string}) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
  return (
    <div
    className='block cursor-pointer'
    aria-label='Delete product from cart'
    onClick={() => {
        startTransition(async () => {
            await removeItem(productId);
            //Should handle errors here
            router.refresh();
        })
    }}>
        {
            isPending ?
            <LoadingSpinner size={4} />
:
        <Image
        src="/trash.png"
        alt="Delete Icon"
        width={15}
        height={15}
        />
    }
    </div>
  )
}

export default TrashIcon