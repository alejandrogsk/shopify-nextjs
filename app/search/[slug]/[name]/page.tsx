import AddToCard from "@/components/Products/AddToCart";
import BuyNow from "@/components/Products/BuyNow";
import Card from "@/components/Products/Card";
import Wrapper from "@/components/layout/Wrapper";
import {
    getProductByHandle,
    getProductById,
} from "@/lib/shopify/queries/product";
import { Product } from "@/types/Product";
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

async function getRltdProd(related: string|undefined) {
    if (typeof related === "undefined") {
        return null;
    }
    const values: string[] = JSON.parse(related);
    if (values.length < 1) {
        return null;
    }
    const products = await Promise.all(
        values.map(async (value) => {
            const prod = await getProductById(value);
            return prod?.body?.data?.product;
        })
    );

    return products;
}

const page = async ({ params }: { params: { name: string } }) => {
    const {
        id,
        title,
        featuredImage,
        description,
        priceRange,
        totalInventory,
        variants,
        collections,
        brand,
        alcohol,
        related,
    } = await getData(params.name);
    const prices = variants.edges[0].node.price.amount;
    const pricesDiscount = variants.edges[0]?.node?.compareAtPrice?.amount;
    const variantId  = variants.edges[0].node.id
    // Need to get the related products wich is a "[]"

    const myRlatedProducts = await getRltdProd(related?.value??undefined);

    return (
        <Wrapper>
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-0 py-4">
                <div className="h-auto max-h-screen w-full relativeflex items-center justify-center">
                    <Image
                        src={featuredImage.url}
                        alt={featuredImage.altText ?? `${title} image`}
                        width={500}
                        height={800}
                        className="w-auto h-full"
                    />
                </div>

                <div className="flex flex-col justify-center	 py-2  py-20">
                    <h1 className="text-3xl">{title}</h1>
                    <div className="flex mt-3">
                        <span className="text-2xl">
                            ${Math.round(Number(prices))}
                        </span>
                        <span className="ml-3 text-2xl line-through text-gray-400">
                            {pricesDiscount
                                ? Math.round(Number(pricesDiscount))
                                : ""}
                        </span>
                    </div>
                    <span className="my-3 block w-full h-[2px] bg-black"></span>
                    <div className="flex justify-between items-center">

                    <div className="flex my-4">
                        {totalInventory < 10 ? (
                            <span className="text-red-500">Only: </span>
                            ) : (
                                <span className="text-black">Available: </span>
                                )}
                        <span className="ml-2">{totalInventory}</span>
                    </div>
                    {brand?.value && (
                        <h2 className="bold">{`${brand.value}`}</h2>
                    )}
                    {alcohol?.value && (
                        <h3>{`Alcohol: ${alcohol.value}%`}</h3>
                    )}

                                </div>
<p className="font-inter normal-case	my-8">{description}</p>

                   <AddToCard variantId={variantId}
                   customStyles="hover:bg-gold-main hover:border-gold-main hover:text-white"
                   />
                   <BuyNow 
                   variantId={variantId} 
                   
                   customStyles="bg-black text-white mt-2 hover:bg-gold-main hover:border-gold-main "/>
                </div>
            </div>

            {myRlatedProducts !== null &&
            typeof myRlatedProducts[0] !== "undefined" ? (
                <RelatedProducts products={myRlatedProducts} />
            ) : (
                <p className="w-full text-center my-20">No related product has been found</p>
            )}
        </Wrapper>
    );
};

export default page;

const RelatedProducts = ({ products }: { products: Product[] }) => {
    return (
        <div className="mt-12">
            <h3 className="text-2xl">Related Products</h3>
            <RelatedGrid products={products} />
        </div>
    );
};

const RelatedGrid = ({ products }: { products: Product[] }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full  gap-x-2 md:gap-x-4 lg:gap-x-8 gap-y-4 md:gap-y-8 lg:gap-y-12 my-4 md:my-8 lg:my-12">
            {products.map((product) => (
                <Card key={product.id} product={product} />
            ))}
        </div>
    );
};
