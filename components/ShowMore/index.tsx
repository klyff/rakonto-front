import React, { useState } from 'react'
import Truncate from 'react-truncate'
import Link from '@mui/material/Link'

interface iShowMore {
  lines?: number
  more?: JSX.Element | string
  less?: JSX.Element | string
  anchorClass?: string
}

const ShowMore: React.FC<iShowMore> = ({
  children,
  lines = 3,
  more = 'Show more',
  less = 'Show less',
  anchorClass = ''
}) => {
  const [expanded, setExpanded] = useState<boolean>(false)
  const [truncated, setTruncated] = useState<boolean>(false)

  const handleTruncate = (value: boolean) => {
    if (value !== truncated) {
      setTruncated(value)
    }
  }

  const toggleLines = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    setExpanded(!expanded)
  }

  return (
    <div>
      <Truncate
        trimWhitespace={false}
        lines={!expanded && lines}
        ellipsis={
          <span>
            ...{' '}
            <Link href="#" className={anchorClass} onClick={toggleLines}>
              {more}
            </Link>
          </span>
        }
        onTruncate={handleTruncate}
      >
        {children}
      </Truncate>
      {!truncated && expanded && (
        <span>
          {' '}
          <Link href="#" className={anchorClass} onClick={toggleLines}>
            {less}
          </Link>
        </span>
      )}
    </div>
  )
}

export default ShowMore
