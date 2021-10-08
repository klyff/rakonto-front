import React, { useContext } from 'react'
import TextField from '@mui/material/TextField'
import PublicLayout from '../../../components/layout/PublicLayout'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { Formik, Form } from 'formik'
import schema from './schema'
import { api } from '../../../lib/api'
import { AxiosError } from 'axios'
import { SimpleDialogContext } from '../../../components/SimpleDialog'
import { SimpleSnackbarContext } from '../../../components/SimpleSnackbar'
import { useRouter } from 'next/router'
import Divider from '@mui/material/Divider'

const ForgotPassword: React.FC = () => {
  const router = useRouter()
  const { actions: dialogActions } = useContext(SimpleDialogContext)
  const { actions: snackActions } = useContext(SimpleSnackbarContext)

  const handleSubmit = async ({ email }: { email: string }) => {
    try {
      await api().requestPasswordReset(email)
      dialogActions.open('Forgot Password', 'We sent you an email with a link to reset your password.')
      router.push('/u/signin')
    } catch (error) {
      const isAxiosError = (candidate: any): candidate is AxiosError => {
        return candidate.isAxiosError === true
      }

      if (isAxiosError(error)) {
        snackActions.open(error?.response?.data.message)
        return
      }
      snackActions.open('Something was wrong! please try again.')
    }
  }

  return (
    <Formik initialValues={{ email: '' }} validationSchema={schema} onSubmit={handleSubmit}>
      {({ isSubmitting, values, handleChange, touched, errors }) => (
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
              <Button color={'primary'} variant="contained" fullWidth type="submit">
                Submit
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
ForgotPassword.getLayout = function getLayout(page) {
  return <PublicLayout>{page}</PublicLayout>
}

export default ForgotPassword
