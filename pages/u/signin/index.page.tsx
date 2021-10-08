import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import PublicLayout from '../../../components/layout/PublicLayout'
import { Form, Formik } from 'formik'
import schema from './schema'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import React, { useContext } from 'react'
import { SigninFormType } from '../../../lib/types'
import { api } from '../../../lib/api'
import { AxiosError } from 'axios'
import { SimpleDialogContext } from '../../../components/SimpleDialog'
import { SimpleSnackbarContext } from '../../../components/SimpleSnackbar'
import FacebookButton from './FacebookButton'
import GoogleButton from './GoogleButton'
import Cookies from 'js-cookie'

const Signin: NextPage = () => {
  const router = useRouter()
  const { actions: dialogActions } = useContext(SimpleDialogContext)
  const { actions: snackActions } = useContext(SimpleSnackbarContext)

  const handleResend = async (email: string) => {
    try {
      await api().requestConfirmEmail(email)
      dialogActions.close()
    } catch (error) {
      dialogActions.open(
        'Confirm email',
        <>
          This email has not confirmed. <br />
          In the next few minutes, we are sending another confirmation email.
          <br />
          Please, verify our email box and confirm it.
        </>
      )
    }
  }

  const handleSubmit = async ({ email, password }: SigninFormType) => {
    try {
      const userInfo = await api().signin({ email, password })
      Cookies.set('token', userInfo.token)
      Cookies.set('user', JSON.stringify(userInfo.user))
      if (router.query.returnUrl) {
        await router.push(router.query.returnUrl as string)
        return
      }
      await router.push('/a/my-libary')
    } catch (error) {
      const isAxiosError = (candidate: any): candidate is AxiosError => {
        return candidate.isAxiosError === true
      }

      if (isAxiosError(error)) {
        if (error?.response?.data.code === '1004') {
          snackActions.open('Email or password are incorrect. Please try again')
          return
        }
        if (error?.response?.data.code === '1005') {
          dialogActions.open(
            'Verify Email',
            <>
              Please verify your email by clicking the link in the message we sent you.
              <br />
              <br />
              <Button color={'primary'} variant="contained" fullWidth onClick={() => handleResend(email)}>
                Resend email
              </Button>
            </>
          )
          return
        }
        snackActions.open(error?.response?.data.message)
      }
    }
  }

  const initialValues: SigninFormType = { email: '', password: '' }
  return (
    <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
      {({ isSubmitting, values, handleChange, errors, touched }) => (
        <Form>
          <Grid container spacing={4} direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={12}>
              <TextField
                name="email"
                fullWidth
                placeholder="Email address"
                label="Email address"
                value={values.email}
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                fullWidth
                placeholder="Password"
                label="Password"
                type="password"
                value={values.password}
                onChange={handleChange}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <Button color={'primary'} variant="contained" fullWidth type="submit" size="large">
                Login
              </Button>
              <Box paddingTop={2.5}>
                <Link href="/u/forgot-password">Forgot Password</Link>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <FacebookButton />
            </Grid>
            <Grid item xs={12}>
              <GoogleButton />
            </Grid>
            <Grid item xs={12}>
              <Button href={'/u/signup'} variant="outlined" fullWidth>
                Create new Account
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  )
}

// @ts-ignore
Signin.getLayout = function getLayout(page) {
  return <PublicLayout>{page}</PublicLayout>
}

export default Signin
