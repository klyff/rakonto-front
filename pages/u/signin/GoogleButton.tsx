import React, { useCallback, useRef, useState } from 'react'
import { styled } from '@mui/material/styles'
import Button, { ButtonProps } from '@mui/material/Button'
import GoogleIcon from '@mui/icons-material/Google'
import { alpha, darken } from '@mui/system'
import GoogleLogin from 'react-google-login'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { SimpleSnackbarContext } from '../../../components/SimpleSnackbar'
import fetchJson from '../../../lib/fetchJson'
import { AuthType } from '../../../lib/types'

const GoogleButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.common.white,
  border: `1px solid ${theme.palette.common.white}`,
  '&:hover': {
    color: darken(theme.palette.common.white, 0.15),
    border: `1px solid ${darken(theme.palette.common.white, 0.15)}`,
    backgroundColor: alpha(theme.palette.common.white, theme.palette.action.hoverOpacity)
  }
}))

GoogleButton.defaultProps = {
  startIcon: <GoogleIcon />,
  variant: 'outlined',
  fullWidth: true,
  children: 'Sign in with google'
}

const Component = () => {
  const router = useRouter()
  const { actions: snackActions } = React.useContext(SimpleSnackbarContext)

  const callback = async (resp: any) => {
    try {
      const userInfo = await fetchJson<AuthType>('/api/u/auth/google', {
        method: 'POST',
        body: JSON.stringify({ token: resp.tokenId }),
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
    <GoogleLogin
      render={renderProps => <GoogleButton onClick={renderProps.onClick} />}
      clientId={process.env.NEXT_PUBLIC_GG_APP_ID || ''}
      onSuccess={callback}
      cookiePolicy={'single_host_origin'}
    />
  )
}

export default Component
