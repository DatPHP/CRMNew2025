// app/components/Navbar.tsx
'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import jsCookie from 'js-cookie'
import { AppBar, Toolbar, Button, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'  // Import SweetAlert2

export default function Navbar() {
  const [mounted, setMounted] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const token = jsCookie.get('token')
    if (token) {
      setIsLoggedIn(true)
      const user = jsCookie.get('userName')
      setUserName(user || 'Guest')
    }
  }, [])

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, log me out!',
      cancelButtonText: 'No, keep me logged in',
    }).then((result) => {
      if (result.isConfirmed) {
        jsCookie.remove('token')
        jsCookie.remove('userName')
        setIsLoggedIn(false)
        setUserName(null)
        Swal.fire(
          'Logged Out!',
          'You have been logged out successfully.',
          'success'
        )
        router.push('/login')  // Redirect to login page after logout
      }
    })
  }

  if (!mounted) {
    return null
  }

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My Next.js App
        </Typography>
        {isLoggedIn ? (
          <>
            <Button color="inherit" component={Link} href="/blogs">Blogs</Button>
            <Typography color="inherit" sx={{ marginRight: 2 }}>
              {userName}
            </Typography>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} href="/login">Login</Button>
            <Button color="inherit" component={Link} href="/register">Register</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}
