import React from 'react'
import Grid from '@mui/material/Grid'
import { api } from '../../../lib/api'
import { NextPage } from 'next'
import { StoryType } from '../../../lib/types'
import useInfiniteScroll from '../../../components/hooks/useInfiniteScrool'
import { usePageableRequest } from '../../../components/hooks/usePageableRequest'
import Card from '../../../components/Card'
import StoryCard from '../../../components/StoryCard'
import AuthenticatedLayout from '../../../components/layout/AuthenticatedLayout'
import Typography from '@mui/material/Typography'

const Stories: NextPage = () => {
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
      container
      sx={{
        padding: '24px'
      }}
      spacing={4}
    >
      <Grid item xs={12}>
        <Typography variant="h6">Stories</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          {items.map(item => (
            <StoryCard key={item.id} story={item} />
          ))}
          {hasNextPage && (
            <Grid item xs>
              <Card loading={true} title={''} subTitle={''} thumbnail={''} preview={''} />
              <div ref={sentryRef} />
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}

// @ts-ignore
Stories.getLayout = function getLayout(page) {
  return <AuthenticatedLayout>{page}</AuthenticatedLayout>
}

export default Stories
