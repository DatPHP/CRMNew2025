// app/homepage/page.tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import jsCookie from 'js-cookie'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    const token = jsCookie.get('token')

    if (!token) {
      // If no token is found, redirect to login page
      router.push('/login')
    }
  }, [router])

  const userName = jsCookie.get('userName') || 'Guest'

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <h1 className="text-3xl">Hello, {userName}!</h1>
    </div>
  )
}
