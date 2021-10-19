import React from 'react'
import { CollectionType } from '../../lib/types'
import { useRouter } from 'next/router'
import Box from '@mui/material/Box'
import Card from '../Card'

const CollectionCard: React.FC<{ collection: CollectionType }> = ({ collection }) => {
  const router = useRouter()
  return (
    <Box
      key={collection.id}
      onClick={() => router.push(`/a/collections/${collection.id}?storyId=${collection.stories[0].id}`)}
      sx={{
        cursor: 'pointer',
        marginBottom: 2
      }}
    >
      <Card
        loading={false}
        type={'COLLECTION'}
        title={collection.title}
        subTitle={`${collection.stories.length} stories`}
        owner={collection.owner}
        thumbnail={collection.thumbnail}
      />
    </Box>
  )
}

export default CollectionCard
