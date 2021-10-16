export default async function fetchJson<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const response = await fetch(input, init)

  // if the server replies, there's always some data in json
  // if there's a network error, it will throw at the previous line
  const text: string = await response.text()

  if (response.ok) {
    if (!!text) {
      return JSON.parse(text) as T
    }
    // @ts-ignore
    return
  }

  const error = new Error(response.statusText)
  // @ts-ignore
  error.response = response
  // @ts-ignore
  error.data = text
  // @ts-ignore
  error.status = response.status
  throw error
}
