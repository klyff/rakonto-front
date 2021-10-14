import React, { useState } from 'react'
import { StoryType } from '../../../../lib/types'
import Box from '@mui/material/Box'
import Image from 'next/image'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import Typography from '@mui/material/Typography'

interface iStory {
  story: StoryType
  playing: boolean
}

const StoryTile: React.FC<iStory> = ({ story, playing }) => {
  const [hover, setHover] = useState<boolean>(false)

  return (
    <Box component={Paper} sx={{ display: 'flex', marginBottom: 3, maxHeight: 200 }} key={story.id}>
      <Box sx={{ position: 'relative' }}>
        <Box
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          sx={{ position: 'relative', width: 327, height: 200 }}
        >
          <Image layout="fill" src={story.thumbnail} alt={story.title} />
          {playing && (
            <>
              <Box
                sx={{
                  position: 'absolute',
                  backgroundColor: 'action.selected',
                  height: '100%',
                  width: '100%'
                }}
              />
              <Box
                sx={{
                  cursor: 'default',
                  color: 'common.black',
                  position: 'absolute',
                  backgroundColor: 'primary.main',
                  minWidth: 48,
                  paddingRight: 2,
                  paddingTop: '5px',
                  paddingBottom: '5px',
                  borderRadius: '0px 40px 40px 0px',
                  top: '10%',
                  left: 0,
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <PlayArrowIcon color="inherit" /> {hover && 'Playing'}
              </Box>
            </>
          )}
          {!playing && hover && (
            <Button
              variant="contained"
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                padding: '20px 16px'
              }}
            >
              <PlayArrowIcon />
            </Button>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'column',
          padding: 3,
          backgroundColor: playing ? 'action.selected' : 'default'
        }}
      >
        <Typography sx={{ fontWeight: '700' }} variant="h5" gutterBottom>
          {story.title}
        </Typography>
        <Typography
          sx={{
            fontWeight: '400'
          }}
          className="line-clamp"
          variant="h6"
        >
          {story.description}
        </Typography>
      </Box>
    </Box>
  )
}

interface iStories {
  stories: StoryType[]
  playing: string
}

const Stories: React.FC<iStories> = ({ stories, playing }) => {
  return (
    <Box sx={{ display: 'flex', flexFlow: 'column', height: '100%' }}>
      {stories.map(story => (
        <StoryTile key={story.id} story={story} playing={story.id === playing} />
      ))}
    </Box>
  )
}

export default Stories
