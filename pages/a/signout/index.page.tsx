import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import fetchJson from '../../../lib/fetchJson'

const Signout: React.FC = () => {
  const router = useRouter()

  useEffect(() => {
    const doLogout = async () => {
      try {
        await fetchJson('/api/a/auth/signout', {
          method: 'POST'
        })
      } catch (error) {
        console.log(error)
      }
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      router.push('/u/signin')
    }
    doLogout()
  }, [])

  return null
}

export default Signout
