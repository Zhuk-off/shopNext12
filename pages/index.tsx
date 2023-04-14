import Image from 'next/image'
import { Inter } from 'next/font/google'
import Header from '@/src/components/layouts/header'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main  >
      <Header/>
      <p className={inter.className}>Hello, Next.js!</p>
      <p style={inter.style}>Hello World</p>
    </main>
  )
}
