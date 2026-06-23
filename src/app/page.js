'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import IntroOverlay from '@/components/IntroOverlay'
import MaybeLater from '@/components/MaybeLater'
import PasswordGate from '@/components/PasswordGate'
import PageTurn from '@/components/PageTurn'
import ThemeToggle from '@/components/ThemeToggle'
import MagazineCover from '@/components/MagazineCover'
import PhotoSpread from '@/components/PhotoSpread'
import MemoryPage from '@/components/MemoryPage'
import LetterSpread from '@/components/LetterSpread'
import SecretPage from '@/components/SecretPage'
import ClosingSection from '@/components/ClosingSection'

export default function Home() {
  const [appState, setAppState] = useState('intro')

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const handleOpen = () => {
    setAppState('password')
  }

  const handleUnlock = () => {
    setAppState('magazine')
  }

  const handleMaybeLater = () => {
    setAppState('maybeLater')
  }

  const handleReturn = () => {
    setAppState('intro')
  }

  return (
    <>
      {appState === 'intro' && (
        <IntroOverlay onOpen={handleOpen} onMaybeLater={handleMaybeLater} />
      )}

      {appState === 'password' && (
        <PasswordGate onUnlock={handleUnlock} />
      )}

      <AnimatePresence>
        {appState === 'maybeLater' && (
          <MaybeLater onReturn={handleReturn} />
        )}
      </AnimatePresence>

      {appState === 'magazine' && (
        <>
          <ThemeToggle />
          <PageTurn>
            <MagazineCover />
            <PhotoSpread />
            <MemoryPage />
            <LetterSpread />
            <SecretPage />
            <ClosingSection />
          </PageTurn>
        </>
      )}
    </>
  )
}
