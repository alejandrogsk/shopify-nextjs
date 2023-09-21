import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Product } from "../../types/Product";
import calculatePercentageDifference from "@/utils/calculatePercentageDifference";
import BuyNow from "./BuyNow";

const Card = ({product}:{product: Product}) => {
    let { title, featuredImage, priceRange, handle, collections, variants } = product;
    const variantId  = variants.edges[0].node.id
    
    return (
        <li className="relative list-none  border-black border-2 p-3 flex flex-col h-full">
        
                {
                    !variants.edges[0].node.availableForSale &&
                    <span className="absolute top-[-2px] right-[-2px] text-white bg-black p-2">No aviable</span>
                }

                {
                    variants.edges[0].node.compareAtPrice?.amount &&
                    <span className="absolute top-0 left-0 text-white bg-black p-2">
                        -
                        {
                            calculatePercentageDifference(
                                Number(variants.edges[0].node.compareAtPrice.amount),
                                Number(variants.edges[0].node.price.amount)
                            )
                        }%
                    </span>
                }
                <div className="w-full h-auto">
                    <Image
                        src={featuredImage.url}
                        alt={featuredImage.altText?? `${title} image`}
                        width={500}
                        height={800}
                        className="w-full h-auto"
                    />
                </div>

                <span className="w-full bg-black h-[1px]"></span>

                <div className="mt-2 grid grid-cols-1 lg:grid-cols-[70%_1fr] text-lg font-medium " >
                    <h2>{title}</h2>

                    <div className="ml-0 lg:ml-auto flex flex-col">
                        {
                            variants.edges[0].node.compareAtPrice &&
                        <span className="line-through">${variants.edges[0].node.compareAtPrice?.amount ?? null}</span>
                        }
                        <span>${variants.edges[0].node.price.amount}</span>
                    </div>

                </div>

                <div className="mt-auto mb-4">Type: <Link className="hover:underline" href={`/search/${collections?.edges[0].node.handle}`}>{collections?.edges[0].node.title}</Link></div>
                <Link href={`/search/${collections?.edges[0].node.title.replaceAll(" ", "-")}/${handle}`} className="w-full bg-black text-white h-[50px] inline-block
                hover:bg-white border-black border-2 hover:text-black duration-500
                grid place-content-center
                ">
                    View More
                </Link>

                <BuyNow variantId={variantId} title="Buy Now" customStyles="mt-2 bg-gold-main hover:bg-white text-white border-gold-main hover:text-gold-main"/>
     
        </li>
    );
};

export default Card;
