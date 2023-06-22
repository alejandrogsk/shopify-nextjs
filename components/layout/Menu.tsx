"use client"
import { getMenu } from '@/lib/shopify/queries/menu'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import Bag from '../icons/Bag'
import User from '../icons/User'


export default function Menu({menuData}:{menuData:any}) {
  let endpoint = "https://whiskey-store-test.myshopify.com"
  const [ isHeaderFixed, setIsHeaderFixed] = useState(false)
  const headerRef = useRef<HTMLHeadingElement|null>(null)
  useEffect(() => {
    const handleScroll = () => {
      if(window.scrollY >= 300 &&  isHeaderFixed === false){
        setIsHeaderFixed(true)
      } else {
        setIsHeaderFixed(false)
      }
    }
    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  return (
    <header className={`bg-black py-2 px-6 ${isHeaderFixed ? "sticky top-0 left-0 right-0 z-20" : "relative"} `} ref={headerRef}>
      <nav className='flex justify-between '>
      <Link className='text-white font-merriweather font-bold' href="/">Brown & Brothers</Link>

      <div className='flex gap-6 items-center'>
        <ul className='flex gap-2'>
          {
            menuData.map((item:any, i:any) =>(
              <li className='text-white'>
                <Link href={item.path.replace(endpoint, "")}>{item.title}</Link>
              </li>
            ))
          }
        </ul>
      
        <div className='flex gap-2 text-white'>
          <Link className='block h-6 w-6' href="/">
            <Bag className='h-6 w-6' />
          </Link>
          <Link className='block h-6 w-6' href="/auth">
            <User className='h-6 w-6' />
          </Link>
        </div>
      </div>
      </nav>
    </header>
  )
}
