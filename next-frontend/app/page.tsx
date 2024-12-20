// app/page.tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import jsCookie from 'js-cookie'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const token = jsCookie.get('token')
    
    if (token) {
      // If the user is already logged in, redirect them to the homepage
      router.push('/homepage')
    }
  }, [router])

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <h1 className="text-3xl">Welcome! Please log in to continue.</h1>
    </div>
  )
}
