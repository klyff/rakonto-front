import React from 'react'
import Header from './Header'
import { MediaStatusProvider } from '../../../components/MediaStatus'

const AuthenticatedLayout: React.FC = ({ children }) => {
  return (
    <MediaStatusProvider>
      <Header />
      {children}
    </MediaStatusProvider>
  )
}

export default AuthenticatedLayout
