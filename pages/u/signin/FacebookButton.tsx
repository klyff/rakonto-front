import * as React from 'react'
import { styled } from '@mui/material/styles'
import Button, { ButtonProps } from '@mui/material/Button'
import { blue } from '@mui/material/colors'
import FacebookIcon from '@mui/icons-material/Facebook'
// @ts-ignore
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { AuthType } from '../../../lib/types'
import fetchJson from '../../../lib/fetchJson'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { SimpleDialogContext } from '../../../components/SimpleDialog'
import { SimpleSnackbarContext } from '../../../components/SimpleSnackbar'

const FacebookButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(blue[500]),
  backgroundColor: blue[500],
  '&:hover': {
    backgroundColor: blue[700]
  }
}))

FacebookButton.defaultProps = {
  startIcon: <FacebookIcon />,
  fullWidth: true,
  children: 'Sign in with facebook'
}

const Component = () => {
  const router = useRouter()
  const { actions: snackActions } = React.useContext(SimpleSnackbarContext)

  const callback = async (resp: any) => {
    try {
      const userInfo = await fetchJson<AuthType>('/api/u/auth/facebook', {
        method: 'POST',
        body: JSON.stringify({ token: resp.accessToken }),
        headers: { 'Content-Type': 'application/json' }
      })
      Cookies.set('token', userInfo.token)
      Cookies.set('user', JSON.stringify(userInfo.user))
      if (router.query.returnUrl) {
        await router.push(router.query.returnUrl as string)
        return
      }
      await router.push('/a/my-library')
    } catch (error) {
      snackActions.open('Something was wrong! please try again.')
    }
  }

  return (
    <FacebookLogin
      appId={process.env.NEXT_PUBLIC_FB_APP_ID || ''}
      // @ts-ignore
      render={({ onClick }) => <FacebookButton onClick={onClick} />}
      callback={callback}
    />
  )
}

export default Component
