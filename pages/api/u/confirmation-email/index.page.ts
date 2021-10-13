import type { NextApiRequest, NextApiResponse } from 'next'
import fetchJson from '../../../../lib/fetchJson'

export default async (req: NextApiRequest, res: NextApiResponse<void>) => {
  try {
    // we check that the user exists on GitHub and store some data in session
    await fetchJson<void>(`${`${process.env.NEXT_PUBLIC_API}${req.url}`}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    })
    res.status(200)
  } catch (error) {
    // @ts-ignore
    const { response: fetchResponse } = error
    // @ts-ignore
    res.status(fetchResponse?.status || 500).json(error.data)
  }
}
