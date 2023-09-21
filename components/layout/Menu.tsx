"use client";
import Link from "next/link";
import React, { useRef, useState } from "react";
import Bag from "../icons/Bag";
import User from "../icons/User";
import MenuMobile from "./MenuMobile";

export default function Menu({ menuData }: { menuData: any }) {
    let endpoint = "https://whiskey-store-test.myshopify.com";
    const [menuMobileVisible, setMenuMobileVisible] = useState(false);
    const headerRef = useRef<HTMLHeadingElement | null>(null);
    return (
        <>
            <header
                className={`bg-black py-2 px-6 z-30 text-white sticky top-0 left-0 right-0 z-20"
                `}
                ref={headerRef}
            >
                <nav className="flex justify-between ">
                    <Link className=" font-merriweather font-bold" href="/">
                        Brown & Brothers
                    </Link>

                    <div className="hidden md:flex gap-6 items-center">
                        <ul className="flex gap-2">
                            {menuData.map((item: any, i: any) => (
                                <li className="" key={i}>
                                    <Link
                                        href={item.path.replace(endpoint, "")}
                                    >
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <div className="flex gap-2 ">
                            <Link
                                className="block h-6 w-6"
                                href="/cart"
                                aria-label="Go to your cart"
                            >
                                <Bag className="h-6 w-6" />
                            </Link>
                            <Link
                                className="block h-6 w-6"
                                href="/auth"
                                aria-label="Log In"
                               
                            >
                                <User className="h-6 w-6" />
                            </Link>
                        </div>
                    </div>

                    <span
                        onClick={() => setMenuMobileVisible(!menuMobileVisible)}
                        className=" cursor-pointer z-20 block md:hidden"
                    >
                        {menuMobileVisible ? "Close" : "Menu"}
                    </span>
                </nav>
            </header>

            <MenuMobile
                menuData={menuData}
                isVisible={menuMobileVisible}
                setMenuMobileVisible={setMenuMobileVisible}
            />
        </>
    );
}
