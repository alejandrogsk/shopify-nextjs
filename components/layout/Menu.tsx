import { getMenu } from '@/lib/shopify/queries/menu'
import Link from 'next/link'
import React from 'react'


export default function Menu({menuData}:{menuData:any}) {
  let endpoint = "https://whiskey-store-test.myshopify.com"
  return (
    <header className='bg-black py-2 px-6'>
      <nav className='flex justify-between '>
      <Link className='text-white font-merriweather font-bold' href="/">Brown & Brothers</Link>

      <ul className='flex gap-2'>
        {
          menuData.map((item:any, i:any) =>(
            <li className='text-white'>
              <Link href={item.path.replace(endpoint, "")}>{item.title}</Link>
            </li>
          ))
        }
      </ul>
      </nav>
    </header>
  )
}
