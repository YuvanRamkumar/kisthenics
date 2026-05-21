import { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const TIME_OPTIONS = [
  { value: 5, label: '5s' },
  { value: 10, label: '10s' },
  { value: 20, label: '20s' },
]

const getBadge = (score) => {
  if (score >= 81) return { title: 'Tap Master', emoji: '🔥', color: 'text-gold' }
  if (score >= 61) return { title: 'Expert', emoji: '🟠', color: 'text-orange-400' }
  if (score >= 41) return { title: 'Advanced', emoji: '🟣', color: 'text-purple-400' }
  if (score >= 21) return { title: 'Intermediate', emoji: '🔵', color: 'text-blue-400' }
  return { title: 'Rookie', emoji: '🟢', color: 'text-green-400' }
}

const getStoredHighScore = () => {
  try {
    const stored = localStorage.getItem('tapSpeed_highScore')
    return stored ? parseInt(stored, 10) : 0
  } catch {
    return 0
  }
}

const saveHighScore = (score) => {
  try {
    const current = getStoredHighScore()
    if (score > current) {
      localStorage.setItem('tapSpeed_highScore', score.toString())
      return true
    }
    return false
  } catch {
    return false
  }
}

const TapSpeed = () => {
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(10)
  const [selectedTime, setSelectedTime] = useState(10)
  const [gameState, setGameState] = useState('idle')
  const [highScore, setHighScore] = useState(getStoredHighScore())
  const [isNewRecord, setIsNewRecord] = useState(false)

  const lastTapTime = useRef(0)
  const badge = getBadge(score)

  useEffect(() => {
    let interval
    if (gameState === 'playing' && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            endGame()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [gameState, timeLeft])

  const endGame = useCallback(() => {
    setGameState('ended')
    const isNew = saveHighScore(score)
    setIsNewRecord(isNew)
    if (isNew) {
      setHighScore(score)
    }
  }, [score])

  const startGame = (time) => {
    setScore(0)
    setTimeLeft(time)
    setSelectedTime(time)
    setGameState('playing')
    setIsNewRecord(false)
  }

  const handleTap = () => {
    if (gameState !== 'playing') return
    
    const now = Date.now()
    if (now - lastTapTime.current < 20) return
    lastTapTime.current = now
    
    setScore((prev) => prev + 1)
  }

  const resetGame = () => {
    setScore(0)
    setTimeLeft(selectedTime)
    setGameState('idle')
    setIsNewRecord(false)
  }

  return (
    <div className="relative py-20 min-h-screen flex items-center justify-center overflow-hidden px-4">
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
            TAP <span className="text-gold">SPEED</span>
          </h2>
          <p className="font-body text-white/50 text-sm">Tap as fast as you can in {selectedTime} seconds</p>
        </div>

        <motion.div
          className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden"
          layout
        >
          {gameState === 'idle' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <div className="mb-8">
                <p className="font-body text-white/40 text-xs uppercase tracking-widest mb-2">Best Score</p>
                <p className="text-5xl font-display text-gold">{highScore}</p>
              </div>

              <div className="mb-8">
                <p className="font-body text-white/60 text-sm mb-4">Select Time</p>
                <div className="flex justify-center gap-4">
                  {TIME_OPTIONS.map((time) => (
                    <button
                      key={time.value}
                      onClick={() => setSelectedTime(time.value)}
                      className={`px-6 py-3 rounded-full font-display text-lg transition-all ${
                        selectedTime === time.value
                          ? 'bg-gold text-black'
                          : 'border border-white/20 text-white/60 hover:border-gold hover:text-gold'
                      }`}
                    >
                      {time.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => startGame(selectedTime)}
                className="px-8 py-4 bg-gold text-black font-display text-xl rounded-full hover:bg-gold/80 transition-all hover:scale-105 hover:shadow-xl hover:shadow-gold/30"
              >
                START
              </button>
            </motion.div>
          )}

          {gameState === 'playing' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <div className="mb-6">
                <motion.div
                  key={score}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className={`inline-block px-4 py-2 rounded-full font-body text-lg ${badge.color} bg-white/5 border border-white/10`}
                >
                  {badge.emoji} {badge.title}
                </motion.div>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <p className="font-body text-white/40 text-xs uppercase tracking-widest mb-2">Time</p>
                  <p className={`text-5xl font-display ${timeLeft <= 3 ? 'text-red-500' : 'text-white'}`}>
                    {timeLeft}s
                  </p>
                </div>
                <div>
                  <p className="font-body text-white/40 text-xs uppercase tracking-widest mb-2">Score</p>
                  <p className="text-5xl font-display text-gold">{score}</p>
                </div>
              </div>

              <button
                onClick={handleTap}
                className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-b from-gold/30 to-gold/10 border-2 border-gold/50 flex flex-col items-center justify-center cursor-pointer active:scale-95 transition-all hover:border-gold hover:shadow-2xl hover:shadow-gold/30 mx-auto"
              >
                <span className="text-4xl font-display text-white">TAP</span>
                <span className="text-xs font-body text-white/50 mt-1">Click to score</span>
              </button>
            </motion.div>
          )}

          {gameState === 'ended' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
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

              <div className="mb-4">
                <div className={`inline-block px-4 py-2 rounded-full font-body text-lg ${badge.color} bg-white/5 border border-white/10`}>
                  {badge.emoji} {badge.title}
                </div>
              </div>

              <div className="mb-8">
                <p className="font-body text-white/40 text-xs uppercase tracking-widest mb-2">Final Score</p>
                <p className="text-7xl font-display text-gold">{score}</p>
              </div>

              <div className="mb-8 text-white/60">
                <p className="text-sm">Best Score: {highScore}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => startGame(selectedTime)}
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
    </div>
  )
}

export default TapSpeed