import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const PLAYER_WIDTH = 40
const PLAYER_HEIGHT = 50
const OBSTACLE_WIDTH = 30
const OBSTACLE_HEIGHT = 40
const GROUND_Y = 60
const INITIAL_SPEED = 5
const SPAWN_INTERVAL = 1800

const getStoredHighScore = () => {
  try {
    const stored = localStorage.getItem('endlessJump_highScore')
    return stored ? parseInt(stored, 10) : 0
  } catch {
    return 0
  }
}

const saveHighScore = (score) => {
  try {
    const current = getStoredHighScore()
    if (score > current) {
      localStorage.setItem('endlessJump_highScore', score.toString())
      return true
    }
    return false
  } catch {
    return false
  }
}

const EndlessJump = () => {
  const [gameState, setGameState] = useState('idle')
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(getStoredHighScore())
  const [isJumping, setIsJumping] = useState(false)
  const [obstacles, setObstacles] = useState([])
  const [isNewRecord, setIsNewRecord] = useState(false)

  const gameAreaRef = useRef(null)
  const gameLoopRef = useRef(null)
  const spawnRef = useRef(null)
  const scoreRef = useRef(0)
  const speedRef = useRef(INITIAL_SPEED)
  const isJumpingRef = useRef(false)

  const gameWidth = 600
  const gameHeight = 300

  const jump = useCallback(() => {
    if (gameState !== 'playing' || isJumpingRef.current) return

    isJumpingRef.current = true
    setIsJumping(true)

    setTimeout(() => {
      isJumpingRef.current = false
      setIsJumping(false)
    }, 600)
  }, [gameState])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault()
        jump()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [jump])

  const startGame = useCallback(() => {
    setScore(0)
    setObstacles([])
    setIsJumping(false)
    setIsNewRecord(false)
    isJumpingRef.current = false
    scoreRef.current = 0
    speedRef.current = INITIAL_SPEED
    setGameState('playing')
  }, [])

  const endGame = useCallback(() => {
    setGameState('ended')
    const finalScore = Math.floor(scoreRef.current)
    const isNew = saveHighScore(finalScore)
    setIsNewRecord(isNew)
    if (isNew) {
      setHighScore(finalScore)
    }
  }, [])

  useEffect(() => {
    if (gameState !== 'playing') {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current)
      if (spawnRef.current) clearInterval(spawnRef.current)
      return
    }

    const spawnObstacle = () => {
      setObstacles((prev) => [
        ...prev,
        {
          id: Date.now(),
          x: gameWidth + 50,
          type: Math.random() > 0.5 ? 'tall' : 'short',
        }
      ])
    }

    spawnRef.current = setInterval(spawnObstacle, SPAWN_INTERVAL)

    const updateGame = () => {
      setObstacles((prev) => {
        const newObstacles = []
        
        for (const obs of prev) {
          const obsHeight = obs.type === 'tall' ? 50 : 30
          const newX = obs.x - speedRef.current
          
          const playerX = 80
          const playerY = isJumpingRef.current ? -70 : 0

          const obsLeft = newX
          const obsRight = newX + OBSTACLE_WIDTH
          const obsBottom = GROUND_Y + obsHeight
          const playerLeft = playerX + 5
          const playerRight = playerX + PLAYER_WIDTH - 5
          const playerBottom = GROUND_Y + playerY + PLAYER_HEIGHT

          if (
            obsRight > playerLeft &&
            obsLeft < playerRight &&
            obsBottom > GROUND_Y + playerY &&
            GROUND_Y + obsHeight < playerBottom
          ) {
            endGame()
            return prev
          }

          if (newX < -50) {
            continue
          }
          
          newObstacles.push({ ...obs, x: newX })
        }
        
        return newObstacles
      })

      scoreRef.current += 0.1
      setScore(Math.floor(scoreRef.current))

      if (scoreRef.current > 30) speedRef.current = INITIAL_SPEED + 1.5
      if (scoreRef.current > 60) speedRef.current = INITIAL_SPEED + 2.5
      if (scoreRef.current > 100) speedRef.current = INITIAL_SPEED + 3.5
    }

    gameLoopRef.current = setInterval(updateGame, 16)

    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current)
      if (spawnRef.current) clearInterval(spawnRef.current)
    }
  }, [gameState, endGame])

  const resetGame = () => {
    setScore(0)
    setObstacles([])
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
            ENDLESS <span className="text-gold">JUMP</span>
          </h2>
          <p className="font-body text-white/50 text-sm">Jump over obstacles. Run as far as you can.</p>
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
                <p className="font-body text-white/40 text-xs uppercase tracking-widest mb-2">Best Distance</p>
                <p className="text-5xl font-display text-gold">{highScore}m</p>
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
            <div className="relative" style={{ height: gameHeight }}>
              <div className="absolute bottom-0 left-0 right-0 h-[60px] bg-gradient-to-t from-white/10 to-transparent rounded-b-xl">
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </div>

              <div
                className="absolute bottom-[60px] left-20 transition-transform duration-200"
                style={{
                  transform: isJumping ? 'translateY(-70px)' : 'translateY(0)'
                }}
              >
                <div className="w-10 h-12 bg-gradient-to-b from-gold to-gold/50 rounded-t-lg relative">
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-6 h-4 bg-black/30 rounded" />
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 w-4 h-2 bg-black/20 rounded" />
                </div>
              </div>

              {obstacles.map((obs) => (
                <motion.div
                  key={obs.id}
                  className={`absolute rounded-t-lg ${
                    obs.type === 'tall' 
                      ? 'w-8 h-[50px] bg-gradient-to-b from-red-500 to-red-700' 
                      : 'w-6 h-[30px] bg-gradient-to-b from-orange-500 to-orange-700'
                  }`}
                  style={{
                    left: obs.x,
                    bottom: GROUND_Y,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {obs.type === 'tall' && (
                    <div className="absolute top-2 left-1 right-1 h-2 bg-white/30 rounded" />
                  )}
                </motion.div>
              ))}

              <div className="absolute top-4 right-4 text-right">
                <p className="font-body text-white/40 text-xs uppercase tracking-widest">Distance</p>
                <p className="text-3xl font-display text-white">{Math.floor(score)}m</p>
              </div>

              <button
                onClick={jump}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 bg-gold/20 border border-gold/50 text-gold font-display text-sm rounded-full hover:bg-gold/30 transition-all active:scale-95"
              >
                JUMP (Space/Click)
              </button>
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
                <p className="font-body text-white/40 text-xs uppercase tracking-widest mb-2">Distance Reached</p>
                <p className="text-7xl font-display text-gold">{Math.floor(score)}m</p>
              </div>

              <div className="mb-8 text-white/60">
                <p className="text-sm">Best: {highScore}m</p>
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

        <p className="text-center text-white/30 text-xs font-body mt-4">
          Press SPACE or Click to jump
        </p>
      </div>
    </div>
  )
}

export default EndlessJump