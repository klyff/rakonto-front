import React, { useState } from 'react'
import AuthenticatedLayout from '../../../../components/layout/AuthenticatedLayout'
import { GetServerSideProps, NextPage } from 'next'
import {
  CollectionType,
  FileType,
  GalleryType,
  LinkType,
  PersonType,
  StoryType,
  TimelineType,
  TranscriptionType
} from '../../../../lib/types'
import { api } from '../../../../lib/api'
import cookieParser from '../../../../lib/cookieParser'
import Player from '../../../../components/Player'
import Cover from '../../../../components/Cover'
import Box from '@mui/material/Box'
import TabsArea from './TabsArea'
import About from './About'
import TabPanel from '@mui/lab/TabPanel'
import Peoples from './Peoples'
import Timelines from './Timelines'
import withSession from '../../../../lib/withSession'
import fetchJson from '../../../../lib/fetchJson'

interface iCollection {
  collection: CollectionType
  persons: PersonType[]
  files: FileType[]
  links: LinkType[]
  galleryEntries: GalleryType[]
  timelineEntries: TimelineType[]
}

const Collection: NextPage<iCollection> = ({ collection, timelineEntries, persons }) => {
  const [play, setPlay] = useState<boolean>(false)
  const [selectedStory, setSelectedStory] = useState<StoryType | undefined>()
  const { thumbnail, title, description, stories, id } = collection

  const handlePlay = () => {
    setSelectedStory(collection.stories[0])
    setPlay(true)
  }

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
        {play ? (
          <Player
            subtitles={selectedStory?.subtitles || []}
            type={selectedStory?.type}
            media={selectedStory?.video || selectedStory?.audio}
            cover={selectedStory?.thumbnail}
            autoplay
          />
        ) : (
          <Cover
            author={collection.owner}
            src={thumbnail}
            title={title}
            description={description}
            onClick={handlePlay}
          />
        )}
      </Box>
      <Box
        sx={{
          width: '100%'
        }}
      >
        <TabsArea>
          <TabPanel value="stories">
            <Peoples persons={persons} />
          </TabPanel>
          <TabPanel value="about">
            <About title={title} description={description} />
          </TabPanel>
          <TabPanel value="peoples">
            <Peoples persons={persons} />
          </TabPanel>
          <TabPanel value="timelines">
            <Timelines timelines={timelineEntries} />
          </TabPanel>
          <TabPanel value="places">places</TabPanel>
          <TabPanel value="photos">photos</TabPanel>
          <TabPanel value="files">files</TabPanel>
          <TabPanel value="links">links</TabPanel>
        </TabsArea>
      </Box>
    </Box>
  )
}

// @ts-ignore
Collection.getLayout = function getLayout(page) {
  return <AuthenticatedLayout>{page}</AuthenticatedLayout>
}

export const getServerSideProps: GetServerSideProps = async ({ params, req, res }) => {
  // @ts-ignore
  const { Authorization } = withSession(req, res)
  // @ts-ignore
  const collection = await fetchJson<CollectionType>(`${process.env.NEXT_PUBLIC_API}/api/a/collections/${params.id}`, {
    method: 'GET',
    headers: { Authorization }
  })

  const accumulator = collection.stories.reduce<{
    persons: PersonType[]
    files: FileType[]
    links: LinkType[]
    galleryEntries: GalleryType[]
    timelineEntries: TimelineType[]
  }>(
    (acc, story) => {
      acc.timelineEntries.push(...story.timelineEntries)
      acc.files.push(...story.files)
      acc.links.push(...story.links)
      acc.galleryEntries.push(...story.galleryEntries)
      acc.persons.push(...story.persons)
      return acc
    },
    {
      persons: [],
      files: [],
      links: [],
      galleryEntries: [],
      timelineEntries: []
    }
  )
  return { props: { collection, ...accumulator } }
}

export default Collection
