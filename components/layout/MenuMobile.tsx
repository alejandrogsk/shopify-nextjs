"use client";
import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import Bag from '../icons/Bag'
import User from '../icons/User'
import { Transition } from '@headlessui/react'
import useScreenSize from '@/hooks/useScreenSize'

const MenuMobile = ({menuData, isVisible, setMenuMobileVisible}:{menuData:any, isVisible:boolean, setMenuMobileVisible:React.Dispatch<React.SetStateAction<boolean>>}) => {
    let endpoint = "https://whiskey-store-test.myshopify.com"
    const screenSize = useScreenSize()
    const ref = useRef<HTMLElement|null>(null)

    useEffect(() => {
        if(screenSize.width > 767 && isVisible){
          setMenuMobileVisible(false)
        }
    },[screenSize])

  return (
    <Transition show={isVisible} className={"fixed top-0 left-0 right-0 bottom-0 w-auto h-sceen z-10"}>
      <Transition.Child
    
    enter="transition ease-in-out duration-300 transform"
    enterFrom="-translate-x-full"
    enterTo="translate-x-0"
    leave="transition ease-in-out duration-300 transform"
    leaveFrom="translate-x-0"
    leaveTo="-translate-x-full"
    className={"h-full"}
    >

    <nav className='w-full h-full px-8 flex flex-col justify-evenly bg-black z-20' ref={ref}>

        <ul className='flex flex-col gap-2'>
          {
            menuData.map((item:any, i:any) =>(
              <li className='text-white' key={i}>
                <Link 
                onClick={()=> setMenuMobileVisible(false)}
                href={item.path.replace(endpoint, "")} >{item.title}</Link>
              </li>
            ))
          }
        </ul>
      
        <div className='flex gap-2 text-white'>
          <Link className='block h-6 w-6' onClick={()=> setMenuMobileVisible(false)} href={`/cart`} aria-label='Go to your cart'>
              <Bag className='h-6 w-6' />
          </Link>
          <Link className='block h-6 w-6' onClick={()=> setMenuMobileVisible(false)} href="/auth" aria-label='Log In'>
            <User className='h-6 w-6' />
          </Link>
      </div>

    </nav>
            </Transition.Child>
    </Transition>
  )
}

export default MenuMobile