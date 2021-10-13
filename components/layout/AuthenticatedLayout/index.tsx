import React from 'react'
import Header from './Header'
import { MediaStatusProvider } from '../../../components/MediaStatus'

const AuthenticatedLayout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default AuthenticatedLayout
