import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Hava Durumu Uygulaması',
  description: 'Anlık hava durumu bilgileri ve 5 günlük tahmin',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  )
}

