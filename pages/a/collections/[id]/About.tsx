import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import ShowMore from '../../../../components/ShowMore'
import Comments from '../../../../components/Comments'

interface iAbout {
  title: string
  description: string
}

const About: React.FC<iAbout> = ({ title, description }) => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex'
      }}
    >
      <Box
        component={Paper}
        sx={{
          width: '100%',
          padding: 3
        }}
      >
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" paragraph>
          {'    ' + description}
        </Typography>
      </Box>
      <Box
        sx={{
          minWidth: '448px',
          paddingLeft: 1
        }}
      >
        <Comments storyId={'123'} comments={[]} watchers={[]} />
      </Box>
    </Box>
  )
}

export default About
