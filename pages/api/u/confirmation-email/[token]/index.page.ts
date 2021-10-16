import type { NextApiRequest, NextApiResponse } from 'next'
import fetchJson from '../../../../../lib/fetchJson'
import { AuthType } from '../../../../../lib/types'

export default async (req: NextApiRequest, res: NextApiResponse<AuthType>) => {
  try {
    // we check that the user exists on GitHub and store some data in session
    const userInfo = await fetchJson<AuthType>(`${`${process.env.NEXT_PUBLIC_API}${req.url}`}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    })
    res.status(200).json(userInfo)
  } catch (error) {
    // @ts-ignore
    res.status(error?.status || 500).json(error.data)
  }
}
