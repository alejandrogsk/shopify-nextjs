import Grid from "@/components/Products/Grid";
import Wrapper from "@/components/layout/Wrapper";
import getCollection from "@/lib/shopify/queries/collections";
import { getProductByHandle } from "@/lib/shopify/queries/product";
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


async function getRelatedProducts(handle:string| undefined) {
    if(typeof handle === "undefined") return null;
    const relatedCollection = await getCollection(handle, 4, null)
    if (relatedCollection.status !== 200) {
        throw new Error("Failed to fetch data");
        //Here should redirect to 404
    }
    return relatedCollection.body.data.collection
}
const page = async ({ params }: { params: { name: string } }) => {
    const { id, title, featuredImage, description, priceRange, totalInventory, variants, collections } = await getData(params.name);
    const prices = variants.edges[0].node.price.amount;
    const pricesDiscount = variants.edges[0]?.node?.compareAtPrice?.amount;
    const relatedProducts = await getRelatedProducts(collections?.edges[0].node.handle)

    return (
            <Wrapper>
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-0 py-4">
                <div className="h-auto w-full relativeflex items-center justify-center">
                    <Image
                        src={featuredImage.url}
                        alt={featuredImage.altText ?? `${title} image`}
                        width={500}
                        height={800}
                        className="w-auto h-full"
                    />
                </div>

                <div className="flex flex-col py-2  py-20">
                        <h1 className="text-3xl">{title}</h1>
                    <div className="flex my-3">
                        <span className="text-2xl">${Math.round(Number(prices))}</span>
                        <span className="ml-3 text-2xl line-through text-gray-400">{pricesDiscount ? Math.round(Number(pricesDiscount)): ""}</span>
                    </div>
                    <p className="font-inter normal-case	">{description}</p>
                    <div className="flex my-4">
                        {
                            totalInventory < 10
                            ? <span className="text-red-500">Only: </span>
                            : <span className="text-black">Available: </span>
                        }
                        <span className="ml-2">{totalInventory}</span>
                    </div>

                    <button className="w-full bg-white text-black mt-auto h-[50px] inline-block
                hover:bg-[#1A1A1A] border-black border-2 hover:text-white duration-500
                grid place-content-center mb-2">Add to Cart</button>
                    <button className="w-full bg-black text-white  h-[50px] inline-block
                hover:bg-[#1A1A1A] border-black border-2 duration-500
                grid place-content-center">Buy Now</button>
                </div>
            </div>

{
   ( relatedProducts !== null && typeof relatedProducts?.products.edges !== "undefined") &&
            <RelatedProducts edges={relatedProducts?.products.edges}
            currenProductId={id}
            />
}

</Wrapper>
    );
};

export default page;


const RelatedProducts = ({edges, currenProductId}: { edges: {node: Product}[], currenProductId: string}) => {
 const related = edges.filter((product) => product.node.id !== currenProductId );
    return(
        <div className="mt-12">
            <h3 className="text-2xl">Related Products</h3>
            <Grid edges={related} />
        </div>
    )
}