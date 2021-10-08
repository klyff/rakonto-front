import React, { useCallback, useContext, useRef, useState } from 'react'
import { convertToRaw, EditorState } from 'draft-js'
import Editor from '@draft-js-plugins/editor'
import EditorWithMentions from '../EditorWithMentions'
import Button from '@mui/material/Button'
import { CommentFormType } from '../../../lib/types'
import { MentionData } from '@draft-js-plugins/mention'
import { SimpleSnackbarContext } from '../../SimpleSnackbar'
import { AxiosError } from 'axios'
import CommentBox from '../CommentBox'
import Typography from '@mui/material/Typography'

interface iCommentEditor {
  createAction: (comment: CommentFormType) => void
  mentions?: MentionData[]
  storyId: string
}

const CommentEditor: React.FC<iCommentEditor> = ({ storyId, mentions, createAction }) => {
  const ref = useRef<Editor>(null)
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
      <Typography>Write a public comment:</Typography>
      <CommentBox
        onClick={() => {
          ref.current?.focus()
        }}
      >
        <EditorWithMentions mentions={mentions} onChange={onChange} state={editorState} ref={ref} />
      </CommentBox>
      <Button variant="outlined" onClick={handleSave}>
        Send comment
      </Button>
    </>
  )
}

export default CommentEditor
