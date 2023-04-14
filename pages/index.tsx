import Image from 'next/image'
import { Inter } from 'next/font/google'
import Header from '@/src/components/layouts/header'




const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="">
      <Header/>

     
    </main>
  )
}
