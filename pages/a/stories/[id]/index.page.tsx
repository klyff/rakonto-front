import React from 'react'
import AuthenticatedLayout from '../../../../components/layout/AuthenticatedLayout'
import { NextPage } from 'next'
import { StoryType } from '../../../../lib/types'
import { api } from '../../../../lib/api'
import cookieParser from '../../../../lib/cookieParser'
import Player from '../../../../components/Player'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import TabsArea from './TabsArea'
import About from './About'
import Comments from '../../../../components/Comments'
import useWindowDimensions from '../../../../components/hooks/useWindowsDimensions'

interface iStory {
  story: StoryType
}

const Story: NextPage<iStory> = ({ story }) => {
  const { type, video, audio, thumbnail, subtitles, owner, title, description, collections, comments, watchers, id } =
    story

  return (
    <Box
      sx={{
        width: '100%',
        maxHeight: `720px`,
        display: 'flex',
        flexFlow: 'column'
      }}
    >
      <Box sx={{ width: '100%', height: '100%', margin: `8px 0` }}>
        <Player subtitles={subtitles || []} type={type} media={video || audio} cover={thumbnail} />
      </Box>
      <Box
        sx={{
          width: '100%'
        }}
      >
        <About description={description} owner={owner} title={title} collections={collections} />
        <Comments comments={comments} watchers={watchers} storyId={id} />
        <TabsArea story={story} />
      </Box>
    </Box>
  )
}

// @ts-ignore
Story.getLayout = function getLayout(page) {
  return <AuthenticatedLayout>{page}</AuthenticatedLayout>
}

Story.getInitialProps = async ({ req, query }) => {
  // @ts-ignore
  const { token } = cookieParser(req?.headers.cookie)
  const story = await api(token).getStory(query.id as string)
  return { story }
}

export default Story
