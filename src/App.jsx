import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Hero from './components/Hero'
import Gallery from './components/Gallery'
import Timeline from './components/Timeline'
import GamesHub from './components/GamesHub'
import TapSpeed from './components/TapSpeed'
import EndlessJump from './components/EndlessJump'
import MemoryMatch from './components/MemoryMatch'
import FanLetters from './components/FanLetters'
import Loader from './components/Loader'
import FloatingMascot from './components/FloatingMascot'
import useScroll from './hooks/useScroll'
import heroBg from './assets/hero-bg.png'

function MainLayout({ children }) {
  const [loading, setLoading] = useState(true)
  useScroll()

  return (
    <div className="relative min-h-screen">
      <Loader onComplete={() => setLoading(false)} />

      <div className="fixed inset-0 z-0">
        <img 
          src={heroBg} 
          alt="Background" 
          className="w-full h-full object-cover blur-xl scale-105 opacity-80"
        />
      </div>

      <main className="relative z-10">
        <Hero />
        <Gallery />
        <Timeline />
        {children}
        <FanLetters />
      </main>

      {!loading && <FloatingMascot instagramLink="https://www.instagram.com/kisthenics2024" />}

      <footer className="relative z-10 py-8 text-center border-t border-white/10 bg-black/40 backdrop-blur-sm">
        <p className="font-body text-sm text-white/70 tracking-widest">
          KISTHENICS <span className="text-gold">UNIVERSE</span>
        </p>
      </footer>
    </div>
  )
}

function GamePage({ children }) {
  const [loading, setLoading] = useState(true)
  useScroll()

  return (
    <div className="relative min-h-screen">
      <Loader onComplete={() => setLoading(false)} />

      <div className="fixed inset-0 z-0">
        <img 
          src={heroBg} 
          alt="Background" 
          className="w-full h-full object-cover blur-xl scale-105 opacity-80"
        />
      </div>

      <main className="relative z-10 pt-20">
        {children}
      </main>

      {!loading && <FloatingMascot instagramLink="https://www.instagram.com/kisthenics2024" />}
    </div>
  )
}

function App() {
  const location = useLocation()
  const isGamePage = location.pathname.startsWith('/games/') && location.pathname !== '/games'

  if (isGamePage) {
    return (
      <GamePage>
        <Routes>
          <Route path="/games/tap-speed" element={<TapSpeed />} />
          <Route path="/games/endless-jump" element={<EndlessJump />} />
          <Route path="/games/memory-match" element={<MemoryMatch />} />
        </Routes>
      </GamePage>
    )
  }

  return (
    <MainLayout>
      <GamesHub />
    </MainLayout>
  )
}

export default App