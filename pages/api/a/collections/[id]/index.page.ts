import type { NextApiRequest, NextApiResponse } from 'next'
import fetchJson from '../../../../../lib/fetchJson'
import withSession from '../../../../../lib/withSession'
import { CollectionType } from '../../../../../lib/types'

export default async (req: NextApiRequest, res: NextApiResponse<CollectionType>) => {
  let { Authorization } = withSession(req, res)

  if (!Authorization) {
    Authorization = req.headers.authorization as string
  }

  try {
    // we check that the user exists on GitHub and store some data in session
    const response = await fetchJson<CollectionType>(`${process.env.NEXT_PUBLIC_API}${req.url}`, {
      method: 'GET',
      headers: { Authorization }
    })
    res.status(200).json(response)
  } catch (error) {
    // @ts-ignore
    res.status(error?.status || 500).json(error.data)
  }
}
