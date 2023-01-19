import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from '../store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import Head from 'next/head'
import {Inter} from '@next/font/google';
import {SessionProvider} from 'next-auth/react'

const inter = Inter({subsets: ['latin']});

let persistor = persistStore(store)

export default function App({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  return (
    <>
      <Head>
        <title>Shoppay</title>
        <meta name="description" content="Shoppay-online shopping service for all of your needs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionProvider session={session}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <main className={inter.className}>
            <Component {...pageProps} />
            </main>
          </PersistGate>
        </Provider>
      </SessionProvider>
    </>
  )
}
