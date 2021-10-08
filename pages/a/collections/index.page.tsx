import React from 'react'
import Grid from '@mui/material/Grid'
import { api } from '../../../lib/api'
import { NextPage } from 'next'
import { CollectionType } from '../../../lib/types'
import useInfiniteScroll from '../../../components/hooks/useInfiniteScrool'
import { usePageableRequest } from '../../../components/hooks/usePageableRequest'
import Card from '../../../components/Card'
import CollectionCard from '../../../components/CollectionCard'
import AuthenticatedLayout from '../../../components/layout/AuthenticatedLayout'
import Typography from '@mui/material/Typography'

const Collections: NextPage = () => {
  const { loading, items, hasNextPage, error, loadMore } = usePageableRequest<CollectionType>({
    size: 15,
    request: api().getCollections
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
        <Typography variant="h6">Collections</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          {items.map(item => (
            <CollectionCard key={item.id} collection={item} />
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
Collections.getLayout = function getLayout(page) {
  return <AuthenticatedLayout>{page}</AuthenticatedLayout>
}

export default Collections
