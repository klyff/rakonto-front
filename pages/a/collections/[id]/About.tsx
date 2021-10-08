import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import ShowMore from '../../../../components/ShowMore'

interface iAbout {
  title: string
  description: string
}

const About: React.FC<iAbout> = ({ title, description }) => {
  return (
    <Box
      component={Paper}
      sx={{
        width: '100%',
        padding: 1
      }}
    >
      <Typography variant="h3">{title}</Typography>
      <Typography variant="h4" gutterBottom>
        {'subtitle'}
      </Typography>
      <ShowMore lines={3}>
        <Typography variant="h6" paragraph>
          {'    ' + description}
        </Typography>
      </ShowMore>
    </Box>
  )
}

export default About
