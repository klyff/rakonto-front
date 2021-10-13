import React from 'react'
import AuthenticatedLayout from '../../../../components/layout/AuthenticatedLayout'
import { GetServerSideProps, NextPage } from 'next'
import { StoryType } from '../../../../lib/types'
import Player from '../../../../components/Player'
import Box from '@mui/material/Box'
import TabsArea from './TabsArea'
import About from './About'
import Comments from '../../../../components/Comments'
import fetchJson from '../../../../lib/fetchJson'
import withSession from '../../../../lib/withSession'

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

export const getServerSideProps: GetServerSideProps = async ({ params, req, res }) => {
  // @ts-ignore
  const { Authorization } = withSession(req, res)
  // @ts-ignore
  const story = await fetchJson<StoryType>(`${process.env.NEXT_PUBLIC_API}/api/a/stories/${params.id}`, {
    method: 'GET',
    headers: { Authorization }
  })
  return { props: { story } }
}

export default Story
