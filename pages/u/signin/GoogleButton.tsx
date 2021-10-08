import React, { useCallback, useRef, useState } from 'react'
import { styled } from '@mui/material/styles'
import Button, { ButtonProps } from '@mui/material/Button'
import GoogleIcon from '@mui/icons-material/Google'
import { alpha, darken } from '@mui/system'
import GoogleLogin from 'react-google-login'

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
  const handleSocialLogin = (user: any) => {
    console.log(user)
  }

  const handleSocialLoginFailure = (err: any) => {
    console.error(err)
  }

  return (
    <GoogleLogin
      render={renderProps => <GoogleButton onClick={renderProps.onClick} />}
      clientId={process.env.REACT_APP_GG_APP_ID || ''}
      onSuccess={handleSocialLogin}
      onFailure={handleSocialLoginFailure}
      cookiePolicy={'single_host_origin'}
    />
  )
}

export default Component
