import Menu from '@/components/layout/Menu'
import './globals.css'
import { Inter, Merriweather, Oswald } from 'next/font/google'
import { Suspense } from 'react'
import { getMenu } from '@/lib/shopify/queries/menu'
import Footer from '@/components/layout/Footer'
const inter = Inter({ subsets: ['latin'], variable: "--font-inter" })

const merriweather = Merriweather({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: "--font-merriweather"
});

const oswald = Oswald({
  weight: ['400', '500', '600', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: "--font-oswald"
});

export const metadata = {
  title: 'Brown and Brothers',
  description: 'This is you place to buy whiskey online',
}


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const menuData = await getMenu("main-menu")

  return (
    <html lang="en">
      <body className={`${inter.variable} ${merriweather.variable}  ${oswald.variable} 
      `}>
        <Menu menuData={menuData} />
        <main className='min-h-[90vh]'>
          <Suspense>
            {children}
          </Suspense>
        </main>
        <Footer />
      </body>
    </html>
  )
}


