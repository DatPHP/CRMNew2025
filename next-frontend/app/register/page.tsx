// app/register/page.tsx
'use client'

import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import jsCookie from 'js-cookie'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await axios.post('http://localhost:8000/api/register', {
        name,
        email,
        password,
      })
      // Automatically log in after registration
      jsCookie.set('token', 'fakeToken')  // Normally you'll get a token from the API response
      jsCookie.set('userName', name)  // Store the user name

      router.push('/login')  // Redirect to login after registration
    } catch (error) {
      console.log(error)
      alert('Registration failed. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Name" 
        required 
      />
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email" 
        required 
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password" 
        required 
      />
      <button type="submit">Register</button>
    </form>
  )
}
