// app/page.tsx (Homepage)
'use client'

import { useEffect, useState } from 'react'
import jsCookie from 'js-cookie'

export default function HomePage() {
  const [userName, setUserName] = useState<string | null>(null)

  useEffect(() => {
    const user = jsCookie.get('userName') // Retrieve the username from the cookies
    setUserName(user || 'Guest') // Default to 'Guest' if no username is found
  }, [])

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <h1 className="text-3xl">Hello, {userName}!</h1>
    </div>
  )
}
