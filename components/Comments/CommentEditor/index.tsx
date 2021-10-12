import React, { useCallback, useContext, useState } from 'react'
import { convertToRaw, EditorState } from 'draft-js'
import EditorWithMentions from '../EditorWithMentions'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { CommentFormType } from '../../../lib/types'
import { MentionData } from '@draft-js-plugins/mention'
import { SimpleSnackbarContext } from '../../SimpleSnackbar'
import { AxiosError } from 'axios'

interface iCommentEditor {
  createAction: (comment: CommentFormType) => void
  mentions?: MentionData[]
  storyId: string
}

const CommentEditor: React.FC<iCommentEditor> = ({ storyId, mentions, createAction }) => {
  const { actions: snackActions } = useContext(SimpleSnackbarContext)
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const handleSave = async () => {
    try {
      await createAction({
        body: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
        storyId
      })
      setEditorState(EditorState.createEmpty())
    } catch (error) {
      const isAxiosError = (candidate: any): candidate is AxiosError => {
        return candidate.isAxiosError === true
      }

      if (isAxiosError(error)) {
        snackActions.open(error?.response?.data.message)
        return
      }
    }
  }

  const onChange = useCallback((_editorState: EditorState) => {
    setEditorState(_editorState)
  }, [])

  return (
    <>
      <EditorWithMentions mentions={mentions} onChange={onChange} state={editorState} />
      <Box sx={{ display: 'flex', justifyContent: 'end' }}>
        <Button variant="outlined" onClick={handleSave}>
          Comment
        </Button>
      </Box>
    </>
  )
}

export default CommentEditor
