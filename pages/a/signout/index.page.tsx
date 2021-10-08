import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { api } from '../../../lib/api'

const Signout: React.FC = () => {
  const router = useRouter()

  useEffect(() => {
    const doLogout = async () => {
      try {
        await api().singout()
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        router.push('/u/signin')
      } catch (error) {
        console.log(error)
      }
    }
    doLogout()
  }, [])

  return null
}

export default Signout
