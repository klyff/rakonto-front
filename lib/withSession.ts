import type { NextApiRequest, NextApiResponse } from 'next'
import Cookies from 'cookies'

export default (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = new Cookies(req, res)
  const token = cookies.get('token')
  if (!token) return { Authorization: null }
  return { Authorization: `Bearer ${token}` }
}
