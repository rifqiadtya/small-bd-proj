import './globals.css'
import ThemeProvider from '@/components/ThemeProvider'

export const metadata = {
  title: 'Annisa Safura — 26',
  description: 'A premium digital magazine celebrating Annisa Safura\'s 26th birthday.',
  openGraph: {
    title: 'Annisa Safura — 26',
    description: 'A premium digital magazine celebrating Annisa Safura\'s 26th birthday.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
