// app/login/page.tsx
'use client'

import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import jsCookie from 'js-cookie'
import { TextField, Button, Box, Typography } from '@mui/material'
import Swal from 'sweetalert2'  // Import SweetAlert2

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {


     const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password,
      })

      // Ensure successful login
      if (response.status === 200) {

        console.log(response);
        // Save the token and user name in cookies or localStorage
        jsCookie.set('token', response?.data?.token)
        jsCookie.set('userName', response?.data?.user.name ?? 'Henry' )  // Assuming the response contains user data

        // Use SweetAlert2 to show success message and then redirect
        Swal.fire({
          title: 'Login Successful',
          text: 'You have logged in successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          router.push('/')  // Redirect to homepage or dashboard after login
        })
      }



    } catch (error) {
      console.log(error)
      Swal.fire({
        title: 'Error!',
        text: 'Login failed. Please check your credentials.',
        icon: 'error',
        confirmButtonText: 'Try Again',
      })
    }
  }

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', padding: 3 }}>
      <Typography variant="h5" gutterBottom>Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
    </Box>
  )
}
