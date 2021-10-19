import React, { useState } from 'react'
import AuthenticatedLayout from '../../../../components/layout/AuthenticatedLayout'
import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import {
  CollectionType,
  FileType,
  GalleryType,
  LinkType,
  PersonType,
  StoryType,
  TimelineType
} from '../../../../lib/types'
import Player from '../../../../components/Player'
import Cover from '../../../../components/Cover'
import Box from '@mui/material/Box'
import About from './About'
import TabPanel from '@mui/lab/TabPanel'
import Peoples from './Peoples'
import Timelines from './Timelines'
import withSession from '../../../../lib/withSession'
import fetchJson from '../../../../lib/fetchJson'
import Stories from './Stories'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import Tab from '@mui/material/Tab'

interface iCollection {
  story: StoryType
  autoplay: boolean
  collection: CollectionType
  persons: PersonType[]
  files: FileType[]
  links: LinkType[]
  galleryEntries: GalleryType[]
  timelineEntries: TimelineType[]
}

const Collection: NextPage<iCollection> = ({ autoplay, collection, story, timelineEntries, persons }) => {
  const [play, setPlay] = useState<boolean>(autoplay)
  const [tab, setTab] = useState<string>('')
  const { thumbnail, title, description, stories, id } = collection

  const handlePlay = () => {
    setPlay(true)
  }

  const onTabClick = (tab = '') => {
    setTab(tab)
  }

  return (
    <>
      <Head>
        <title>Rakonto - {collection.title}</title>
        <meta property="description" content={collection.description || ''} />
        <meta property="creator" content={collection.owner.firstName || ''} />
        <meta property="publisher" content={'Rakonto'} />
        <meta property="og:image" content={collection.thumbnail} />
      </Head>
      <Box
        sx={{
          width: '100%',
          height: `100%`,
          display: 'flex',
          flexFlow: 'column'
        }}
      >
        <Box sx={{ width: '100%', height: '100%' }}>
          {play ? (
            <Player
              handleEnd={() => console.log('end')}
              subtitles={story?.subtitles || []}
              type={story?.type}
              media={story?.video || story?.audio}
              cover={story?.thumbnail}
              autoplay={autoplay}
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
          component={TabContext}
          value={(tab as string) || 'stories'}
          sx={{
            width: '100%',
            height: '100%'
          }}
        >
          <Box
            component={TabList}
            variant="scrollable"
            sx={{
              backgroundColor: 'background.paper',
              boxShadow: 6
            }}
          >
            <Tab label="Stories" value="stories" onClick={() => onTabClick('stories')} />
            <Tab label="About" value="about" onClick={() => onTabClick('about')} />
            <Tab label="Peoples" value="peoples" onClick={() => onTabClick('peoples')} />
            <Tab label="Timelines" value="timelines" onClick={() => onTabClick('timelines')} />
            <Tab label="Places" value="places" onClick={() => onTabClick('places')} />
            <Tab label="Photos" value="photos" onClick={() => onTabClick('photos')} />
            <Tab label="Files" value="files" onClick={() => onTabClick('files')} />
            <Tab label="Links" value="links" onClick={() => onTabClick('links')} />
          </Box>
          <TabPanel sx={{ height: '100%' }} value="stories">
            <Stories collectionId={id} selectedStory={story.id} playing={play} stories={stories} />
          </TabPanel>
          <TabPanel sx={{ height: '100%' }} value="about">
            <About title={title} description={description} />
          </TabPanel>
          <TabPanel sx={{ height: '100%' }} value="peoples">
            <Peoples persons={persons} />
          </TabPanel>
          <TabPanel sx={{ height: '100%' }} value="timelines">
            <Timelines timelines={timelineEntries} />
          </TabPanel>
          <TabPanel sx={{ height: '100%' }} value="places">
            places
          </TabPanel>
          <TabPanel sx={{ height: '100%' }} value="photos">
            photos
          </TabPanel>
          <TabPanel sx={{ height: '100%' }} value="files">
            files
          </TabPanel>
          <TabPanel sx={{ height: '100%' }} value="links">
            links
          </TabPanel>
        </Box>
      </Box>
    </>
  )
}

// @ts-ignore
Collection.getLayout = function getLayout(page) {
  return <AuthenticatedLayout>{page}</AuthenticatedLayout>
}

export const getServerSideProps: GetServerSideProps = async ({ params, query, resolvedUrl, req, res }) => {
  // @ts-ignore
  const { Authorization } = withSession(req, res)

  if (!Authorization) {
    return {
      redirect: {
        destination: '/u/signin',
        permanent: false
      }
    }
  }
  try {
    const collection = await fetchJson<CollectionType>(
      // @ts-ignore
      `${process.env.NEXT_PUBLIC_LOCAL_CONTEXT}/api/a/collections/${params.id}`,
      {
        method: 'GET',
        headers: { Authorization }
      }
    )

    if (!query.storyId) {
      return {
        redirect: {
          statusCode: 301,
          destination: `${resolvedUrl}?storyId=${collection.stories[0].id}`
        }
      }
    }

    if (!collection) {
      return {
        notFound: true
      }
    }

    const accumulator = collection?.stories?.reduce<{
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

    const story = collection.stories.find(story => story.id === query.storyId)

    return {
      props: {
        autoplay: query.autoplay || false,
        story,
        collection,
        ...accumulator
      }
    }
  } catch (error) {
    // @ts-ignore
    if (error.status === 403) {
      return {
        redirect: {
          statusCode: 301,
          destination: '/403'
        }
      }
    }
  }

  return {
    notFound: true
  }
}

export default Collection
