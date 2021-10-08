import * as React from 'react'
import { styled } from '@mui/material/styles'
import Button, { ButtonProps } from '@mui/material/Button'
import { blue } from '@mui/material/colors'
import FacebookIcon from '@mui/icons-material/Facebook'
// @ts-ignore
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

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
  return (
    <FacebookLogin
      appId="1088597931155576"
      fields="name,email,picture"
      // @ts-ignore
      render={({ onClick }) => <FacebookButton onClick={onClick} />}
      callback={(resp: any) => console.log(resp)}
    />
  )
}

export default Component
