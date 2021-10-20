import type { NextApiRequest, NextApiResponse } from 'next'
import fetchJson from '../../../../../lib/fetchJson'
import withSession from '../../../../../lib/withSession'
import { Pageable, CommentType } from '../../../../../lib/types'

export default async (req: NextApiRequest, res: NextApiResponse<CommentType>) => {
  const { Authorization } = withSession(req, res)
  try {
    if (req.method === 'DELETE') {
      await fetchJson<CommentType>(`${process.env.NEXT_PUBLIC_API}${req.url}`, {
        method: 'DELETE',
        headers: { Authorization }
      })
      res.status(204).end()
    } else if (req.method === 'PUT') {
      const response = await fetchJson<CommentType>(`${process.env.NEXT_PUBLIC_API}${req.url}`, {
        method: 'PUT',
        headers: { Authorization, 'Content-Type': 'application/json' },
        body: req.body
      })
      res.status(200).json(response)
    } else {
      const response = await fetchJson<CommentType>(`${process.env.NEXT_PUBLIC_API}${req.url}`, {
        method: 'GET',
        headers: { Authorization }
      })
      res.status(200).json(response)
    }
  } catch (error) {
    // @ts-ignore
    res.status(error?.status || 500).json(error.data)
  }
}
