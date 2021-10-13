import type { NextApiRequest, NextApiResponse } from 'next'
import fetchJson from '../../../../../lib/fetchJson'
import withSession from '../../../../../lib/withSession'

export default async (req: NextApiRequest, res: NextApiResponse<void>) => {
  const { Authorization } = withSession(req, res)
  try {
    // we check that the user exists on GitHub and store some data in session
    const userInfo = await fetchJson<void>(`${process.env.NEXT_PUBLIC_API}${req.url}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization }
    })
    res.status(200)
  } catch (error) {
    // @ts-ignore
    const { response: fetchResponse } = error
    // @ts-ignore
    res.status(fetchResponse?.status || 500).json(error.data)
  }
}