"use client"
import { useTransition } from "react";
import { addItem } from "../Cart/actions";
import { useRouter } from "next/navigation";
const AddToCard = ({ variantId, redirectTo, title="Add To Cart", customStyles }: { variantId: string, redirectTo?: string, title?: string, customStyles?:string }) => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    return (
            <button
                onClick={() => {
                    startTransition(async () => {
                        await addItem(variantId);
                        //Should handle errors here
                        if(redirectTo){
                            router.push(redirectTo)
                        } else {
                            router.refresh();
                        }
                    })
                }}
                className={`w-full h-[3.125rem] inline-block border-black border-2 duration-200 grid place-content-center
                ${customStyles && customStyles}
                `}
            >
                {isPending ? "Wait...": title}
            </button>
    );
};
export default AddToCard;
