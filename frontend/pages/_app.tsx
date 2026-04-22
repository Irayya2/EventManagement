import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '@/hooks/useAuth'
import { Toaster } from 'react-hot-toast'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Head>
        <title>EventMaster - Event Management System</title>
      </Head>
      <Component {...pageProps} />
      <Toaster position="top-center" />
    </AuthProvider>
  )
}
