import React from 'react'
import { CommentType, WatcherType } from '../../lib/types'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Comment from './Comment'
import { useCommentApi } from './useCommentApi'
import CommentEditor from './CommentEditor'
import Divider from '@mui/material/Divider'

interface iComments {
  comments: CommentType[]
  watchers: WatcherType[]
  storyId: string
}

const Comments: React.FC<iComments> = ({ storyId, comments: initialComments, watchers }) => {
  const { createComment, deleteComment, editComment, comments } = useCommentApi(storyId, initialComments)

  const mentions = watchers
    ?.filter(w => w.user != null)
    .map(w => {
      return {
        id: w.user.id,
        name: `${w.user.firstName} ${w.user.lastName}`,
        avatar: w.user.picture?.thumbnail
      }
    })

  return (
    <Box
      component={Paper}
      sx={{
        width: '100%',
        padding: 1,
        height: '100%'
      }}
    >
      <CommentEditor mentions={mentions} createAction={createComment} storyId={storyId} />
      <Divider sx={{ margin: '16px 0px' }} />
      <Typography>Comments</Typography>
      <List>
        {comments.map(comment => (
          <Comment
            deleteComment={deleteComment}
            editComment={editComment}
            id={comment.id}
            mentions={mentions}
            key={comment.id}
            comment={comment}
          />
        ))}
      </List>
    </Box>
  )
}

export default Comments
