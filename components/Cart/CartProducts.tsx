import { CartItem } from "@/lib/shopify/types";
import Image from "next/image";
import EditItemQuantityButton from "./EditItemQuantityButton";
import TrashIcon from "./TrashIcon";
import Link from "next/link";
const CartProduct = ({ node }: { node: CartItem }) => {
    let nodeId = node.id
    let product = node.merchandise.product
    const { title, description, variants } = product;
    console.log("product TTTTTAAAAAGGGGGGSSSSS", product.tags);
    console.log("product options", product.options);
    console.log("product variants", product.variants);
    return (
        <div className="border-b-[1px] border-black grid grid-cols-[150px_1fr] w-full py-2">
            <Link href={`/search/${product.tags[0].replace(" ","-")}/${product.handle}`}>
                <Image
                    alt={product.title}
                    src={product.featuredImage.url}
                    width={100}
                    height={100}
                    className="w-full h-auto"
                />
            </Link>
            <div className="flex flex-col gap-12">
                <h2>
                    {title}
                    </h2>
                <p>{`${description.slice(0, 90)}...`}</p>

                <div className="flex gap-3">
                    <p>{`Unit: ${variants.edges[0].node.price.amount}`}</p>
                
                    <p>{`Total: ${node.cost.totalAmount.amount}`}</p>
                </div>

                <div className="flex items-center gap-4">
                    <TrashIcon productId={nodeId}  />
                    <div className="grid grid-cols-[20px_20px_20px] items-center border-[1px] border-black h-8">
                        <EditItemQuantityButton item={node} type="minus"  />
                        <span className="border-x-[1px] border-black flex items-center justify-center">
                            {node.quantity}
                        </span>
                        <EditItemQuantityButton item={node} type="plus"  />
                    </div>
                </div>
            </div>
        </div>
    );
};


export default CartProduct;