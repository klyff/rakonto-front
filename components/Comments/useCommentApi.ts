import { useState, useEffect } from 'react'
import { api } from '../../lib/api'
import { Pageable, CommentFormType, CommentType } from '../../lib/types'
import fetchJson from '../../lib/fetchJson'

export const useCommentApi = (
  commentId: string,
  type: 'collection' | 'story'
): {
  comments: CommentType[]
  isLoading: boolean
  createComment: (comment: CommentFormType) => Promise<void>
  deleteComment: (id: string) => Promise<void>
  editComment: (id: string, data: CommentFormType) => Promise<void>
} => {
  const [localComments, setLocalComments] = useState<CommentType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    setIsLoading(true)
    const fetch = async () => {
      const comments = await fetchJson<Pageable<CommentType>>(
        // @ts-ignore
        `${process.env.NEXT_PUBLIC_LOCAL_CONTEXT}/api/a/comments?commentableId=${commentId}&commentableType=${type}`,
        {
          method: 'GET'
        }
      )
      setLocalComments(comments.content)
      setIsLoading(false)
    }
    fetch()
  }, [])

  const createComment = async (comment: CommentFormType) => {
    const newComment = await fetchJson<CommentType>(
      // @ts-ignore
      `${process.env.NEXT_PUBLIC_LOCAL_CONTEXT}/api/a/comments`,
      {
        method: 'POST',
        body: JSON.stringify(comment)
      }
    )
    setLocalComments([newComment, ...localComments])
  }

  const deleteComment = async (id: string): Promise<void> => {
    await fetchJson<void>(
      // @ts-ignore
      `${process.env.NEXT_PUBLIC_LOCAL_CONTEXT}/api/a/comments/${id}`,
      {
        method: 'DELETE'
      }
    )
    setLocalComments(localComments.filter(comment => comment.id !== id))
  }

  const editComment = async (id: string, data: CommentFormType): Promise<void> => {
    const newComment = await fetchJson<CommentType>(
      // @ts-ignore
      `${process.env.NEXT_PUBLIC_LOCAL_CONTEXT}/api/a/comments/${id}`,
      {
        method: 'PUT',
        body: JSON.stringify(data)
      }
    )
    setLocalComments(
      localComments.map(comment => {
        if (comment.id === newComment.id) {
          return newComment
        }
        return comment
      })
    )
  }

  return { comments: localComments, isLoading, createComment, deleteComment, editComment }
}
