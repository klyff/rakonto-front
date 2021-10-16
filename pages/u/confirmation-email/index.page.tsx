import React, { useContext, useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { FormikValues } from 'formik'
import schema from './schema'
import { api } from '../../../lib/api'
import { SimpleDialogContext } from '../../../components/SimpleDialog'
import { SimpleSnackbarContext } from '../../../components/SimpleSnackbar'
import { FormDialogContext } from '../../../components/FormDialog'
import { useRouter } from 'next/router'
import fetchJson from '../../../lib/fetchJson'
import { AuthType } from '../../../lib/types'
import Cookies from 'js-cookie'

const ConfirmationEmail: React.FC = () => {
  const router = useRouter()
  const { token: confirmationToken } = router.query
  const { actions: dialogActions } = useContext(SimpleDialogContext)
  const { actions: snackActions } = useContext(SimpleSnackbarContext)
  const { actions: formDialogActions } = useContext(FormDialogContext)

  const handleSubmit = async ({ email }: FormikValues) => {
    try {
      await api().requestConfirmEmail(email)
      dialogActions.open('Confirm email', <>We sent an email to you to confirm your account. Please check this.</>)
      router.push('/u/signin')
    } catch (error) {
      router.push('/u/signin')
    }
  }

  useEffect(() => {
    if (!confirmationToken) return
    const confirm = async () => {
      try {
        const userInfo = await fetchJson<AuthType>(`/api/u/confirmation-email/${confirmationToken}`, {
          method: 'POST'
        })
        Cookies.set('token', userInfo.token)
        Cookies.set('user', JSON.stringify(userInfo.user))
        dialogActions.open(
          'Welcome to Rakonto!',
          <>
            Thank you for joining the world&apos;s first platform specifically designed to create, view and share your
            most important stories. Enjoy!
          </>
        )
        router.push('/a/my-library')
      } catch (error) {
        // @ts-ignore
        let { data } = error
        if (data) {
          data = JSON.parse(data)
          if (data.code === '1003') {
            formDialogActions.open(
              'Expired link',
              'This link has expired. Please enter your email address to resend another link to you to confirm your account.',
              [{ name: 'email', placeholder: 'Email address', label: 'Email address' }],
              { email: '' },
              schema,
              handleSubmit,
              { okText: 'Submit', cancelText: 'Close' }
            )
          }
          if (data.code === '1002') {
            //TODO TypeError
            dialogActions.open(
              'Confirm email',
              <>
                This token not found. if you have registered, please try to login to request another confirmation email.
              </>,
              { cancelText: 'Ok' }
            )
            router.push('/u/signin')
          }
          snackActions.open(data.message)
          return
        }
        snackActions.open('Something was wrong! please try again.')
      }
    }
    confirm()
  }, [confirmationToken])

  return (
    <Box width="100%" height="100vh" display="flex" justifyContent="center" alignItems="center">
      <CircularProgress />
    </Box>
  )
}

export default ConfirmationEmail
