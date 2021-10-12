import React, { useCallback, useMemo, useRef, useState } from 'react'
import createMentionPlugin, { defaultSuggestionsFilter, MentionData } from '@draft-js-plugins/mention'
import Entry from './Entry'
import Editor from '@draft-js-plugins/editor'
import { EditorState } from 'draft-js'
import CommentBox from './CommentBox'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

interface iMention {
  mentions?: MentionData[]
  state: EditorState
  onChange: (state: EditorState) => void
  readOnly?: boolean
}

const DraftField = React.forwardRef<Editor, any>(function DraftField(props, ref) {
  const { component: Component, editorRef, handleOnChange, ...rest } = props

  return <Component {...rest} ref={editorRef} onChange={handleOnChange} />
})

const EditorWithMentions: React.FC<iMention> = React.forwardRef<Editor, iMention>(
  ({ mentions, state, onChange, readOnly }) => {
    const ref = useRef<Editor>(null)
    const [open, setOpen] = useState(false)
    const [suggestions, setSuggestions] = useState(mentions || [])
    const { MentionSuggestions, plugins } = useMemo(() => {
      const mentionPlugin = createMentionPlugin({
        entityMutability: 'IMMUTABLE',
        mentionPrefix: '@',
        supportWhitespace: true
      })

      const { MentionSuggestions } = mentionPlugin
      const plugins = [mentionPlugin]
      return { plugins, MentionSuggestions }
    }, [])

    const onOpenChange = useCallback((_open: boolean) => {
      setOpen(_open)
    }, [])
    const onSearchChange = useCallback(({ value }: { value: string }) => {
      setSuggestions(defaultSuggestionsFilter(value, mentions || []))
    }, [])

    const mentionComponent = (
      <MentionSuggestions
        open={open}
        onOpenChange={onOpenChange}
        suggestions={suggestions}
        onSearchChange={onSearchChange}
        entryComponent={Entry}
        popoverContainer={({ children }) => <div>{children}</div>}
      />
    )

    return (
      <>
        <div
          onClick={() => {
            ref?.current?.focus()
          }}
        >
          <Box component={Typography} sx={{ paddingBottom: 1 }}>
            Add a comment
          </Box>
          <CommentBox>
            <Editor
              readOnly={readOnly}
              editorKey="editor"
              editorState={state}
              onChange={onChange}
              plugins={plugins}
              ref={ref}
            />
          </CommentBox>
          {mentionComponent}
        </div>
      </>
    )
  }
)

export default EditorWithMentions
