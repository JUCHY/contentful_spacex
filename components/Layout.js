import Head from 'next/head'
import Link from 'next/link'
import Navbar from 'react-bootstrap/Navbar'

export default function Layout({ children }) {
    return <div>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
       {children}
    </div>
  }