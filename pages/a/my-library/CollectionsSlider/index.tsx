import React from 'react'
import { api } from '../../../../lib/api'
import { NextPage } from 'next'
import { CollectionType } from '../../../../lib/types'
import useInfiniteScroll from '../../../../components/hooks/useInfiniteScrool'
import { usePageableRequest } from '../../../../components/hooks/usePageableRequest'
import Grid from '@mui/material/Grid'
import Card from '../../../../components/Card'
import CollectionCard from '../../../../components/CollectionCard'
import { useRouter } from 'next/router'

const CollectionsSlider: NextPage = () => {
  const router = useRouter()
  const { loading, items, hasNextPage, error, loadMore } = usePageableRequest<CollectionType>({
    size: 15,
    url: '/api/a/collections'
  })

  // @ts-ignore
  if (error?.status === 401) {
    router.push('/u/signin')
  }

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
      {items.map(collection => (
        <CollectionCard key={collection.id} collection={collection} />
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

export default CollectionsSlider
