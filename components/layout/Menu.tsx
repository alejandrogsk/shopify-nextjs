import { getMenu } from '@/lib/shopify/queries/menu'
import Link from 'next/link'
import React from 'react'


export default async function Menu() {
  const menuData = await getMenu("main-menu")
  let endpoint = "https://whiskey-store-test.myshopify.com"
  return (
    <header className='bg-black py-2 px-6'>
      <nav className='flex justify-between '>
      <div className='text-white'>Menu</div>

      <ul className='flex gap-2'>
        {
          menuData.map((item, i) =>(
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
