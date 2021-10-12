import { styled } from '@mui/material/styles'

const CommentBox = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  boxSizing: 'border-box',
  border: '1px solid',
  borderColor: theme.palette.grey[900],
  cursor: 'text',
  padding: '16px',
  borderRadius: '4px',
  marginBottom: '1em',
  boxShadow: theme.shadows[3]
  //boxShadow: `0px 2px 1px -1px ${theme.palette.grey[600]},0px 1px 1px 0px ${theme.palette.grey[400]},0px 1px 3px 0px ${theme.palette.grey[200]}`
}))

export default CommentBox
