import React from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Image from 'next/image'

const PublicLayout: React.FC = ({ children }) => {
  const matches = useMediaQuery('(min-width:769px)')
  return (
    <Container>
      <Box
        sx={{
          position: 'absolute',
          maxWidth: matches ? 684 : '100%',
          width: '100%',
          minHeight: 755,
          padding: `32px 5vw`,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '20px'
        }}
        component={matches ? Paper : 'div'}
      >
        <Box paddingBottom={matches ? 18 : 10} textAlign="center" paddingTop={6}>
          <Image src={'/images/logo2.svg'} width={238} alt="rakonto" />
        </Box>
        {children}
      </Box>
    </Container>
  )
}

export default PublicLayout
