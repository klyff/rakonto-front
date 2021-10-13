import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import PublicLayout from '../../../components/layout/PublicLayout'
import { Form, Formik } from 'formik'
import schema from './schema'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import React, { useContext } from 'react'
import { SingupFormType } from '../../../lib/types'
import { api } from '../../../lib/api'
import { AxiosError } from 'axios'
import { SimpleDialogContext } from '../../../components/SimpleDialog'
import { SimpleSnackbarContext } from '../../../components/SimpleSnackbar'
import Divider from '@mui/material/Divider'
import fetchJson from '../../../lib/fetchJson'

const Signup: NextPage = () => {
  const router = useRouter()
  const { actions: dialogActions } = useContext(SimpleDialogContext)
  const { actions: snackActions } = useContext(SimpleSnackbarContext)

  const handleSubmit = async ({ email, firstName, lastName, password, confirmation }: SingupFormType) => {
    try {
      await fetchJson('/api/u/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ email, firstName, lastName, password, confirmation }),
        headers: { 'Content-Type': 'application/json' }
      })
      router.push('/u/signin')
      dialogActions.open('Confirm email', 'We sent an email to you to confirm your account. Please check this.', {
        cancelText: 'Close'
      })
    } catch (error) {
      // @ts-ignore
      const { data } = error
      if (data) {
        if (error?.response?.data.code === '1001') {
          snackActions.open('Email is already taken.')
          return
        }
        snackActions.open(data.message)
      }
      snackActions.open('Something was wrong! please try again.')
    }
  }

  const initialValues: SingupFormType = { email: '', password: '', confirmation: '', firstName: '', lastName: '' }
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
                name="firstName"
                fullWidth
                placeholder="First Name"
                label="First Name"
                value={values.firstName}
                onChange={handleChange}
                error={touched.firstName && Boolean(errors.firstName)}
                helperText={touched.firstName && errors.firstName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="lastName"
                fullWidth
                placeholder="Last Name"
                label="Last Name"
                value={values.lastName}
                onChange={handleChange}
                error={touched.lastName && Boolean(errors.lastName)}
                helperText={touched.lastName && errors.lastName}
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
              <TextField
                name="confirmation"
                fullWidth
                placeholder="Confirmation password"
                label="Confirmation password"
                type="password"
                value={values.confirmation}
                onChange={handleChange}
                error={touched.confirmation && Boolean(errors.confirmation)}
                helperText={touched.confirmation && errors.confirmation}
              />
            </Grid>
            <Grid item xs={12}>
              <Button color={'primary'} variant="contained" fullWidth type="submit">
                Create account
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs>
              <Button href="/u/signin" fullWidth>
                Back to login
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  )
}

// @ts-ignore
Signup.getLayout = function getLayout(page) {
  return <PublicLayout>{page}</PublicLayout>
}

export default Signup
