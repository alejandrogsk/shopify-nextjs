import { getProductByHandle } from "@/lib/shopify/queries/product";
import Image from "next/image";
import React from "react";
async function getData(slug: string) {
    const products = await getProductByHandle(slug);
    if (products.status !== 200) {
        throw new Error("Failed to fetch data");
    }
    return products.body.data.product;
}

export async function generateMetadata({
    params,
}: {
    params: { name: string };
}) {
    const { seo } = await getData(params.name);
    return {
        title: seo.title ?? "Product",
        description: seo.description ?? "Some description",
    };
}
const page = async ({ params }: { params: { name: string } }) => {
    const { title, featuredImage, description, priceRange, totalInventory } = await getData(params.name);

    return (
        <div className="mx-4 md:mx-8 lg:mx-20">
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="h-[90vh] relative w-auto flex items-center justify-center">
                    <Image
                        src={featuredImage.url}
                        alt={featuredImage.altText ?? `${title} image`}
                        width={500}
                        height={800}
                        className="w-auto h-full"
                    />
                </div>
                <div className="flex flex-col">
                    <div>
                    <h1 className="text-2xl">{title}</h1>
                    <span>{priceRange.maxVariantPrice.amount}</span>
                    <span>{priceRange.minVariantPrice.amount}</span>
                    </div>
                    <p>{description}</p>
                    <span>QUANTITY: {totalInventory}</span>

                    <button className="w-full bg-white text-black mt-auto h-[50px] inline-block
                hover:bg-black border-black border-2 hover:text-white duration-500
                grid place-content-center mb-2">Add to Cart</button>
                    <button className="w-full bg-black text-white  h-[50px] inline-block
                hover:bg-white border-black border-2 hover:text-black duration-500
                grid place-content-center">Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default page;
