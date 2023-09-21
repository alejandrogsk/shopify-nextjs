"use client";
import { useTransition } from 'react';
import { CartItem } from '@/lib/shopify/types';
import { useRouter } from 'next/navigation';
import { removeItem, updateItemQuantity } from './actions';
import LoadingSpinner from '../LoadingSpinner';

export default function EditItemQuantityButton({
  item,
  type
}: {
  item: CartItem;
  type: 'plus' | 'minus';
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <button
      aria-label={type === 'plus' ? 'Increase item quantity' : 'Reduce item quantity'}
      onClick={() => {
        startTransition(async () => {
          const error =
            type === 'minus' && item.quantity - 1 === 0
              ? await removeItem(item.id)
              : await updateItemQuantity({
                  lineId: item.id,
                  variantId: item.merchandise.id,
                  quantity: type === 'plus' ? item.quantity + 1 : item.quantity - 1
                });

          if (error) {
            // Trigger the error boundary in the root error.js
            throw new Error(error.toString());
          }

          router.refresh();
        });
      }}
      disabled={isPending}
      className=""
    >
      {isPending ? (
        <LoadingSpinner size={4} />
      ) : type === 'plus' ? (
        "+"
      ) : (
        "-"
      )}
    </button>
  );
}