'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import jsCookie from 'js-cookie'
import { Box, Typography, Button } from '@mui/material'
import Swal from 'sweetalert2'

type Blog = {
  id: number
  title: string
  content: string
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = jsCookie.get('token')
        if (!token) {
          throw new Error('No token found')
        }

        const response = await axios.get('http://localhost:8000/api/blogs', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setBlogs(response.data)
        setLoading(false)
      } catch (error) {
        setLoading(false)

        // Type guard to check for AxiosError
        if (axios.isAxiosError(error )) {
          // Handle Axios-specific errors
          if (error.response && error.response.status === 401) {
            Swal.fire({
              title: 'Unauthorized',
              text: 'You are not logged in or your session has expired. Please login again.',
              icon: 'error',
              confirmButtonText: 'Login',
            }).then(() => {
              router.push('/login')  // Redirect to login page
            })
          } else {
            // Handle other Axios errors (e.g., network, timeout)
            Swal.fire({
              title: 'Error',
              text: error.response ? error.response.data.message : 'Network error. Please try again later.',
              icon: 'error',
              confirmButtonText: 'Close',
            })
          }
        } else {
          // Handle general errors (non-Axios, possibly thrown by our own code)
          Swal.fire({
            title: 'Error',
            text: 'Something went wrong. Please try again later.',
            icon: 'error',
            confirmButtonText: 'Close',
          })
        }
      }
    }

    fetchBlogs()
  }, [router])

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', padding: 3 }}>
        <Typography variant="h6">Loading blogs...</Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>Blog List</Typography>
      {blogs.length === 0 ? (
        <Typography>No blogs available.</Typography>
      ) : (
        <Box>
          {blogs.map((blog) => (
            <Box key={blog.id} sx={{ marginBottom: 3, padding: 2, border: '1px solid #ccc', borderRadius: 1 }}>
              <Typography variant="h6">{blog.title}</Typography>
              <Typography>{blog.content}</Typography>
            </Box>
          ))}
        </Box>
      )}
      <Button variant="contained" color="primary" onClick={() => router.push('/blogs/create')}>
        Create New Blog
      </Button>
    </Box>
  )
}
