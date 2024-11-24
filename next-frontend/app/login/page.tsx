// app/login/page.tsx
'use client'

import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import jsCookie from 'js-cookie'
import Swal from 'sweetalert2'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)

    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password,
      })

      // Store token and user name in cookies
      jsCookie.set('token', response.data.token)
      jsCookie.set('userName', response.data.user.name)

      // Show success alert and redirect to homepage
      Swal.fire({
        title: 'Login Successful',
        text: 'You have logged in successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        router.push('/homepage')  // Redirect to homepage after login
      })
    } catch (error) {
      console.log(error)
      Swal.fire({
        title: 'Login Failed',
        text: 'Please check your credentials and try again.',
        icon: 'error',
        confirmButtonText: 'Close',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl mb-4 text-center">Login</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="border p-2 w-full mb-4"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="border p-2 w-full mb-4"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full p-2 bg-blue-600 text-white rounded"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  )
}
