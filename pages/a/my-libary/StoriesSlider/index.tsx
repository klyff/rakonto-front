import React from 'react'
import Grid from '@mui/material/Grid'
import { api } from '../../../../lib/api'
import { NextPage } from 'next'
import { StoryType } from '../../../../lib/types'
import useInfiniteScroll from '../../../../components/hooks/useInfiniteScrool'
import { usePageableRequest } from '../../../../components/hooks/usePageableRequest'
import Card from '../../../../components/Card'
import StoryCard from '../../../../components/StoryCard'

const StoriesSliderTile: NextPage = () => {
  const { loading, items, hasNextPage, error, loadMore } = usePageableRequest<StoryType>({
    size: 15,
    request: api().getStories
  })

  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    disabled: !!error,
    rootMargin: '0px 0px 400px 0px'
  })

  return (
    <Grid
      wrap="nowrap"
      sx={{
        overflowX: 'auto',
        '::-webkit-scrollbar': {
          display: 'none'
        }
      }}
      container
    >
      {items.map(story => (
        <StoryCard key={story.id} story={story} />
      ))}
      {hasNextPage && (
        <Grid>
          <Card loading={true} title={''} subTitle={''} thumbnail={''} preview={''} />
          <div ref={sentryRef} />
        </Grid>
      )}
    </Grid>
  )
}

export default StoriesSliderTile
