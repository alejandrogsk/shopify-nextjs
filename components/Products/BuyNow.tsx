"use client"
import { useTransition } from "react";
import { addItem } from "../Cart/actions";
import { useRouter } from "next/navigation";
import Link from "next/link";
const BuyNow = ({ variantId, title="Buy Now", customStyles }: { variantId: string, title?: string, customStyles?:string }) => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    return (
            <Link 
                prefetch={false}
                href="/cart"
                onClick={(e) => {
                    e.preventDefault()
                    startTransition(async () => {
                        await addItem(variantId);
                        //Should handle errors here
                        router.push("/cart")
                    })
                }}
                className={`w-full h-[3.125rem] inline-block border-black border-2 duration-200 grid place-content-center
                ${customStyles && customStyles}
                `}
            >
                {isPending ? "Wait...": title}
            </Link>
    );
};
export default BuyNow;
