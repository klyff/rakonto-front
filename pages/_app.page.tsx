import '../styles/globals.css'
import type { AppContext, AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from '../lib/theme'
import { CacheProvider, EmotionCache } from '@emotion/react'
import createEmotionCache from '../lib/createEmotionCache'
import { SimpleSnackbarProvider } from '../components/SimpleSnackbar'
import { SimpleDialogProvider } from '../components/SimpleDialog'
import { FormDialogProvider } from '../components/FormDialog'
import { AuthType } from '../lib/types'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { CircularProgress } from '@mui/material'
import Box from '@mui/material/Box'

const clientSideEmotionCache = createEmotionCache()

interface iMyApp extends AppProps {
  emotionCache: EmotionCache
  session: AuthType
}

const MyApp = ({ Component, emotionCache = clientSideEmotionCache, pageProps }: iMyApp) => {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)

  function authCheck(url: string) {
    // redirect to login page if accessing a private page and not logged in
    const path = url.split('?')[0]
    const token = Cookies.get('token')
    if (path.startsWith('/a') && !token) {
      setAuthorized(false)
      router.push({
        pathname: '/u/signin',
        query: { returnUrl: router.asPath === '/a/signout' ? '/' : router.asPath }
      })
    } else {
      setAuthorized(true)
    }
  }

  useEffect(() => {
    // run auth check on initial load
    authCheck(router.asPath)

    // set authorized to false to hide page content while changing routes
    const hideContent = () => setAuthorized(false)
    router.events.on('routeChangeStart', hideContent)

    // run auth check on route change
    router.events.on('routeChangeComplete', authCheck)

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off('routeChangeStart', hideContent)
      router.events.off('routeChangeComplete', authCheck)
    }
  }, [])

  // @ts-ignore
  const getLayout = Component.getLayout || (page => page)

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Rakonto</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SimpleSnackbarProvider>
          <SimpleDialogProvider>
            <FormDialogProvider>
              {authorized ? (
                getLayout(<Component {...pageProps} />)
              ) : (
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <CircularProgress size={60} />
                </Box>
              )}
            </FormDialogProvider>
          </SimpleDialogProvider>
        </SimpleSnackbarProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MyApp
