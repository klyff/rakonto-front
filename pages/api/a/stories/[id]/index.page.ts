import type { NextApiRequest, NextApiResponse } from 'next'
import fetchJson from '../../../../../lib/fetchJson'
import withSession from '../../../../../lib/withSession'
import { CollectionType } from '../../../../../lib/types'

export default async (req: NextApiRequest, res: NextApiResponse<CollectionType>) => {
  const { Authorization } = withSession(req, res)
  try {
    // we check that the user exists on GitHub and store some data in session
    const response = await fetchJson<CollectionType>(`${process.env.NEXT_PUBLIC_API}${req.url}`, {
      method: 'GET',
      headers: { Authorization }
    })
    res.status(200).json(response)
  } catch (error) {
    // @ts-ignore
    const { response: fetchResponse } = error
    // @ts-ignore
    res.status(fetchResponse?.status || 500).json(error.data)
  }
}
