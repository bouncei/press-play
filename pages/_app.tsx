import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react" // Its a higher order component, so that I can persist the state

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
