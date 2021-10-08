import { styled } from '@mui/material/styles'

const CommentBox = styled('div')(({ theme }) => ({
  backgroundColor: 'transparent',
  boxSizing: 'border-box',
  border: '1px solid',
  borderColor: theme.palette.grey['400'],
  cursor: 'text',
  padding: '16px',
  borderRadius: '2px',
  marginBottom: '1em',
  boxShadow: `inset 0 1px 8px -3px ${theme.palette.grey['300']}`
}))

export default CommentBox
