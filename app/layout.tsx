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
      <Script id="hotjar">
        {
          `
          ;(function (h, o, t, j, a, r) {
            h.hj =
              h.hj ||
              function () {
                ;(h.hj.q = h.hj.q || []).push(arguments)
              }
            h._hjSettings = { hjid: 3745393, hjsv: 6 }
            a = o.getElementsByTagName('head')[0]
            r = o.createElement('script')
            r.async = 1
            r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv
            a.appendChild(r)
          })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=')
          `
        }
      </Script>


      <body className={inter.className}>{children}</body>
    </html>
  )
}
