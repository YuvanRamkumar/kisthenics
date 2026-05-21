import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const games = [
  {
    id: 'tap-speed',
    path: '/games/tap-speed',
    title: 'TAP SPEED',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
    description: 'Tap rapidly to earn aura points. Test your speed and reflexes.',
    color: 'gold'
  },
  {
    id: 'endless-jump',
    path: '/games/endless-jump',
    title: 'ENDLESS JUMP',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    description: 'Jump over obstacles. Run as far as you can. How far can you go?',
    color: 'navy'
  },
  {
    id: 'memory-match',
    path: '/games/memory-match',
    title: 'MEMORY MATCH',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
    description: 'Match the pairs. Test your memory. Find all matching cards to win.',
    color: 'gold'
  }
]

const GamesHub = () => {
  return (
    <section className="relative py-24 min-h-screen flex items-center justify-center overflow-hidden px-4">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] bg-gold/5" />
      </div>

      <div className="relative z-10 w-full max-w-5xl">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-7xl font-display text-white mb-4">
              THE <span className="text-gold">GAMES</span> HUB
            </h2>
            <p className="font-body text-white/60 max-w-xl mx-auto text-sm md:text-base">
              Choose your challenge. Test your skills. Earn your aura.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {games.map((game, index) => (
            <Link
              key={game.id}
              to={game.path}
              className="group relative glass rounded-3xl p-8 text-left hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gold/20 block"
              style={{ '--glow-color': game.color === 'gold' ? 'rgba(245,158,11,0.3)' : 'rgba(30,58,138,0.3)' }}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ boxShadow: `0 0 40px ${game.color === 'gold' ? 'rgba(245,158,11,0.15)' : 'rgba(30,58,138,0.2)'}` }}
                />
                
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                  game.color === 'gold' ? 'bg-gold/20 text-gold' : 'bg-navy/30 text-navy'
                }`}>
                  {game.icon}
                </div>

                <h3 className={`text-2xl font-display mb-3 ${
                  game.color === 'gold' ? 'text-gold' : 'text-navy'
                }`}>
                  {game.title}
                </h3>

                <p className="font-body text-white/60 text-sm leading-relaxed">
                  {game.description}
                </p>

                <div className="mt-6 flex items-center gap-2 text-white/40 group-hover:text-gold transition-colors">
                  <span className="text-sm font-body">Play Now</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-white/30 text-sm font-body mt-12"
        >
          Click any game to start playing
        </motion.p>
      </div>
    </section>
  )
}

export default GamesHub