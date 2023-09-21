"use client"
import React from 'react'
import parse from 'html-react-parser';
import Image from 'next/image';
import Link from 'next/link';
import Wrapper from '../layout/Wrapper';

const Banner = ({ title, body}: 
    {
        title: string, body:string
    }) => {
    const imageData:any = parse(body);
    const imageSRC = imageData?.props?.src.replaceAll("480","2000");
  return (
    <div className={`relative h-[120vh] w-full overflow-hidden grid grid-cols-1 lg:grid-cols-2
    bg-no-repeat bg-left bg-cover py-8
    `}
    style={{
        backgroundImage: `url(${imageSRC}`,
        backgroundColor:"#000000"
    }}
    >
        <div className='hidden lg:block'></div>

        <Wrapper customStyle='relative flex flex-col justify-center items-start gap-4'>
            <h1 className='text-white text-5xl font-semibold uppercase'
            style={{textShadow: "1px 1px 1px black"}}
            >Providing our customers the best whiskey since 1883</h1>
            <Link href="/search/bourbon" className="mt-4 bg-black text-white h-[50px] inline-block
                hover:bg-white border-black border-2 hover:text-black duration-500
                grid place-content-center uppercase font-regular border-white px-3
                ">View the best bourbon</Link>
          </Wrapper>
    </div>
  )
}

export default Banner