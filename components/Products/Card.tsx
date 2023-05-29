import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Product } from "../../types/Product";
const Card = ({product}:{product: Product}) => {
    let { title, featuredImage, priceRange,handle, collections } = product;
    return (
        <li className="list-none flex flex-col h-full">
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

                <div className="flex justify-between flex-col lg:flex-row text-lg font-medium " >
                    <h2>{title}</h2>

                    <span>${priceRange.minVariantPrice.amount}</span>
                </div>

                <div className="my-4">Type: <Link className="hover:underline" href={`/search/${collections?.edges[0].node.handle}`}>{collections?.edges[0].node.title}</Link></div>
                <Link href={`/search/${collections?.edges[0].node.title.replaceAll(" ", "-")}/${handle}`} className="w-full bg-black text-white mt-auto h-[50px] inline-block
                hover:bg-white border-black border-2 hover:text-black duration-500
                grid place-content-center
                ">
                    View More
                </Link>
        </li>
    );
};

export default Card;
