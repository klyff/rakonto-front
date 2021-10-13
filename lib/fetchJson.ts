export default async function fetchJson<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  try {
    const response = await fetch(input, init)

    // if the server replies, there's always some data in json
    // if there's a network error, it will throw at the previous line
    const data: T = await response.json()

    if (response.ok) {
      return data
    }

    const error = new Error(response.statusText)
    // @ts-ignore
    error.response = response
    // @ts-ignore
    error.data = data
    // @ts-ignore
    error.status = response.status
    throw error
  } catch (error) {
    // @ts-ignore
    if (!error.data) {
      // @ts-ignore
      error.data = { message: error.message }
    }
    throw error
  }
}
