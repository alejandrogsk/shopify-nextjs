"use client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import LoadingSpinner from "../LoadingSpinner";

const Logout = () => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    return (
        <button
            className="text-2xl underline cursor-ponter mt-4 flex justify-center items-center"
            onClick={() => {
                startTransition(async () => {
                    await fetch("/api/auth/logout", {
                        method: "GET",
                        headers: { "Content-Type": "application/json" },
                    });
                    //Should handle errors here
                    router.refresh();
                    router.push('/auth');
                });
            }}
        >
            {isPending ? <LoadingSpinner size={4} /> : "Logout"}
        </button>
    );
};

export default Logout;
