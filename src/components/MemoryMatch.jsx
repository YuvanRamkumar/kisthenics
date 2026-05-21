import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const symbols = [
  { id: 1, icon: '💪', name: 'Strength' },
  { id: 2, icon: '🔥', name: 'Fire' },
  { id: 3, icon: '⚡', name: 'Power' },
  { id: 4, icon: '🏆', name: 'Trophy' },
  { id: 5, icon: '⭐', name: 'Star' },
  { id: 6, icon: '💎', name: 'Diamond' },
  { id: 7, icon: '🦾', name: 'Gear' },
  { id: 8, icon: '👊', name: 'Fist' },
]

const getStoredHighScore = () => {
  try {
    const stored = localStorage.getItem('memoryMatch_highScore')
    return stored ? parseInt(stored, 10) : 999
  } catch {
    return 999
  }
}

const saveHighScore = (time) => {
  try {
    const current = getStoredHighScore()
    if (time < current) {
      localStorage.setItem('memoryMatch_highScore', time.toString())
      return true
    }
    return false
  } catch {
    return false
  }
}

const MemoryMatch = () => {
  const [cards, setCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])
  const [matchedPairs, setMatchedPairs] = useState([])
  const [gameState, setGameState] = useState('idle')
  const [timer, setTimer] = useState(0)
  const [highScore, setHighScore] = useState(getStoredHighScore())
  const [isNewRecord, setIsNewRecord] = useState(false)
  const [canFlip, setCanFlip] = useState(true)

  const timerRef = useRef(null)

  const initializeGame = () => {
    const shuffledCards = [...symbols, ...symbols]
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({
        ...symbol,
        uniqueId: index,
      }))
    setCards(shuffledCards)
    setFlippedCards([])
    setMatchedPairs([])
    setTimer(0)
    setCanFlip(true)
    setIsNewRecord(false)
  }

  useEffect(() => {
    if (gameState === 'playing') {
      timerRef.current = setInterval(() => {
        setTimer((prev) => prev + 1)
      }, 1000)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [gameState])

  useEffect(() => {
    if (matchedPairs.length === symbols.length && gameState === 'playing') {
      endGame()
    }
  }, [matchedPairs])

  const startGame = () => {
    initializeGame()
    setGameState('playing')
  }

  const endGame = () => {
    setGameState('ended')
    const isNew = saveHighScore(timer)
    setIsNewRecord(isNew)
    if (isNew) {
      setHighScore(timer)
    }
  }

  const handleCardClick = (card) => {
    if (!canFlip || gameState !== 'playing') return
    if (flippedCards.length >= 2) return
    if (matchedPairs.includes(card.id)) return
    if (flippedCards.find((c) => c.uniqueId === card.uniqueId)) return

    const newFlipped = [...flippedCards, card]
    setFlippedCards(newFlipped)

    if (newFlipped.length === 2) {
      setCanFlip(false)
      const [first, second] = newFlipped

      if (first.id === second.id) {
        setMatchedPairs((prev) => [...prev, first.id])
        setFlippedCards([])
        setCanFlip(true)
      } else {
        setTimeout(() => {
          setFlippedCards([])
          setCanFlip(true)
        }, 1000)
      }
    }
  }

  const resetGame = () => {
    setGameState('idle')
    setTimer(0)
    setFlippedCards([])
    setMatchedPairs([])
    setIsNewRecord(false)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <section id="memory-match" className="relative py-20 min-h-screen flex items-center justify-center overflow-hidden px-4">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[100px] bg-gold/10" />
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        <div className="flex items-center justify-between mb-8">
          <Link 
            to="/games" 
            className="flex items-center gap-2 text-white/60 hover:text-gold transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-body">Back to Games</span>
          </Link>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-6xl font-display text-white mb-2">
            MEMORY <span className="text-gold">MATCH</span>
          </h2>
          <p className="font-body text-white/50 text-sm">Match all pairs as fast as you can</p>
        </div>

        <motion.div
          className="glass rounded-3xl p-6 md:p-8 relative overflow-hidden"
          layout
        >
          {gameState === 'idle' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <div className="mb-8">
                <p className="font-body text-white/40 text-xs uppercase tracking-widest mb-2">Best Time</p>
                <p className="text-5xl font-display text-gold">{formatTime(highScore)}</p>
              </div>
              <button
                onClick={startGame}
                className="px-8 py-4 bg-gold text-black font-display text-xl rounded-full hover:bg-gold/80 transition-all hover:scale-105 hover:shadow-xl hover:shadow-gold/30"
              >
                START
              </button>
            </motion.div>
          )}

          {gameState === 'playing' && (
            <div className="text-center">
              <div className="mb-6">
                <p className="font-body text-white/40 text-xs uppercase tracking-widest">Time</p>
                <p className="text-4xl font-display text-white">{formatTime(timer)}</p>
                <p className="text-white/40 text-sm mt-2">
                  {matchedPairs.length} / {symbols.length} pairs
                </p>
              </div>

              <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-sm mx-auto">
                {cards.map((card) => {
                  const isFlipped = flippedCards.find((c) => c.uniqueId === card.uniqueId)
                  const isMatched = matchedPairs.includes(card.id)

                  return (
                    <motion.button
                      key={card.uniqueId}
                      onClick={() => handleCardClick(card)}
                      className={`aspect-square rounded-xl flex items-center justify-center text-3xl transition-all duration-300 ${
                        isMatched
                          ? 'bg-gold/20 border-2 border-gold/50'
                          : isFlipped
                          ? 'bg-white/10 border-2 border-white/30'
                          : 'bg-white/5 border-2 border-white/10 hover:border-gold/50 hover:bg-white/10'
                      }`}
                      whileHover={{ scale: isMatched ? 1 : 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={isMatched || isFlipped}
                    >
                      <AnimatePresence mode="wait">
                        {(isFlipped || isMatched) ? (
                          <motion.span
                            initial={{ rotateY: 90, opacity: 0 }}
                            animate={{ rotateY: 0, opacity: 1 }}
                            exit={{ rotateY: 90, opacity: 0 }}
                          >
                            {card.icon}
                          </motion.span>
                        ) : (
                          <motion.span
                            initial={{ rotateY: 90 }}
                            animate={{ rotateY: 0 }}
                            className="text-white/30"
                          >
                            ?
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  )
                })}
              </div>
            </div>
          )}

          {gameState === 'ended' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              {isNewRecord && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="mb-6 inline-block"
                >
                  <span className="px-4 py-2 bg-gold text-black font-display text-lg rounded-full">
                    NEW RECORD!
                  </span>
                </motion.div>
              )}

              <div className="mb-8">
                <p className="font-body text-white/40 text-xs uppercase tracking-widest mb-2">Your Time</p>
                <p className="text-7xl font-display text-gold">{formatTime(timer)}</p>
              </div>

              <div className="mb-8 text-white/60">
                <p className="text-sm">Best Time: {formatTime(highScore)}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={startGame}
                  className="px-8 py-4 bg-gold text-black font-display text-xl rounded-full hover:bg-gold/80 transition-all hover:scale-105"
                >
                  PLAY AGAIN
                </button>
                <button
                  onClick={resetGame}
                  className="px-8 py-4 border border-white/20 text-white font-display text-xl rounded-full hover:border-gold hover:text-gold transition-all"
                >
                  MENU
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default MemoryMatch