const cookieParser = (value: string): Record<string, string> => {
  if (!value) return {}
  return value.split('; ').reduce<Record<string, string>>((prev, current) => {
    const [name, ...value] = current.split('=')
    prev[name] = value.join('=')
    return prev
  }, {})
}

export default cookieParser
