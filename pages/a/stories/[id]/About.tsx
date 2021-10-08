import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { CollectionType, CommentType, UserType } from '../../../../lib/types'
import ShowMore from '../../../../components/ShowMore'

interface iAbout {
  owner: UserType
  title: string
  description: string
  collections: CollectionType[]
}

const About: React.FC<iAbout> = ({ owner, title, description, collections }) => {
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
        {collections[0]?.title}
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
