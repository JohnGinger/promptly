import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'promptme',
  description: 'Learn how to prompt with promptme'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-8121SQR4CB" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-8121SQR4CB');
        `}
      </Script>
      <Script src="https://static.hotjar.com/c/hotjar-3745393.js?sv=6" />

      <body className={inter.className}>{children}</body>
    </html>
  )
}
