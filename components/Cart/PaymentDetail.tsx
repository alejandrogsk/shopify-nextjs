import { Cost } from "@/lib/shopify/types";
import Link from "next/link";

const PaymentDetail = ({ cost }: { cost: Cost }) => {
    return (
        <div className="relative">
            <div className="flex flex-col relative lg:sticky top-12 left-0 right-0">
            <h3>Payment data</h3>
            <div className="flex flex-col mt-4 gap-2">
                <div className="flex">
                    Subtotal:{" "}
                    <span className="ml-auto">
                        {cost.subtotalAmount.amount} -{" "}
                        {cost.totalAmount.currencyCode}
                    </span>
                </div>

                <div className="flex">
                    Tax:{" "}
                    <span className="ml-auto">
                        {cost.totalTaxAmount.amount} -{" "}
                        {cost.totalAmount.currencyCode}
                    </span>
                </div>

                <div className="flex">
                    Total:{" "}
                    <span className="ml-auto">
                        {cost.totalAmount.amount} -{" "}
                        {cost.totalAmount.currencyCode}
                    </span>
                </div>
            </div>

            <Link className="w-full h-8 bg-gold-main text-white mt-12 flex items-center justify-center" href="/cart/payments">
                Pay Now
            </Link>
        </div>
        </div>
    );
};
export default PaymentDetail;
