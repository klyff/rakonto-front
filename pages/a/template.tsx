import React, { useContext } from 'react'
import AuthenticatedLayout from '../../components/layout/AuthenticatedLayout'
import { useRouter } from 'next/router'

const MyLibary: React.FC = () => {
  const router = useRouter()

  return <div>MyLibary</div>
}

// @ts-ignore
MyLibary.getLayout = function getLayout(page) {
  return <AuthenticatedLayout>{page}</AuthenticatedLayout>
}

export default MyLibary
