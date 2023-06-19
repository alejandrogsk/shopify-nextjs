"use client"
import React from 'react'
import parse from 'html-react-parser';
import Image from 'next/image';
import Link from 'next/link';

const Banner = ({ title, body}: 
    {
        title: string, body:string
    }) => {
    const imageData = parse(body);
    const imageSRC = imageData.props?.src.replaceAll("480","2000");
  return (
    <div className={`relative h-screen w-full overflow-hidden grid grid-cols-1 lg:grid-cols-2`}
    style={{
        backgroundImage: `url(${imageSRC}`,
        backgroundSize: "cover",
        backgroundPosition: "center",backgroundRepeat: "no-repeat",
    }}
    >
        <div className='hidden lg:block'></div>
        <div className='relative flex flex-col justify-center items-start gap-4'>
            <h1 className='text-white text-3xl uppercase'>Providing our customers the best whiskey since 1883</h1>
            <Link href="/search/bourbon" className="bg-black text-white h-[50px] inline-block
                hover:bg-white border-black border-2 hover:text-black duration-500
                grid place-content-center uppercase border-white px-3
                ">View the best bourbon</Link>
        </div>
    </div>
  )
}

export default Banner