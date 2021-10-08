import React, { useState } from 'react'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import Box from '@mui/material/Box'

const TabsArea: React.FC = ({ children }) => {
  const [tab, setTab] = useState<string>('')

  const onTabClick = (tab = '') => {
    setTab(tab)
  }

  return (
    <TabContext value={(tab as string) || 'stories'}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList variant="scrollable">
          <Tab label="Stories" value="stories" onClick={() => onTabClick('stories')} />
          <Tab label="About" value="about" onClick={() => onTabClick('about')} />
          <Tab label="Peoples" value="peoples" onClick={() => onTabClick('peoples')} />
          <Tab label="Timelines" value="timelines" onClick={() => onTabClick('timelines')} />
          <Tab label="Places" value="places" onClick={() => onTabClick('places')} />
          <Tab label="Photos" value="photos" onClick={() => onTabClick('photos')} />
          <Tab label="Files" value="files" onClick={() => onTabClick('files')} />
          <Tab label="Links" value="links" onClick={() => onTabClick('links')} />
        </TabList>
      </Box>
      {children}
    </TabContext>
  )
}

export default TabsArea
