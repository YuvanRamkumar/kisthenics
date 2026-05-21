import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { heroContent } from '../data/content'
import heroBg from '../assets/hero-bg.png'
import actionFigure from '../assets/IMG_7877.png'

const Hero = () => {
  const [showCredit, setShowCredit] = useState(false)
  const containerRef = useRef()
  const { scrollYProgress } = useScroll()

  const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])
  const titleY = useTransform(scrollYProgress, [0, 0.1], [0, -50])

  const handleClick = () => {
    setShowCredit(true)
  }

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    })
  }

  const title = heroContent.title.split('')

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
      onClick={handleClick}
    >
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="Hero Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-end pb-32 z-10"
        style={{ opacity: titleOpacity, y: titleY }}
      >
        <div className="flex">
          {title.map((letter, i) => (
            <motion.span
              key={i}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={letterVariants}
              className="text-5xl md:text-[12vw] leading-none font-display text-gold tracking-wider drop-shadow-xl"
            >
              {letter}
            </motion.span>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-3xl font-body text-white italic mt-6 tracking-[0.3em] drop-shadow-lg"
        >
          {heroContent.tagline}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: showCredit ? 1 : 0 }}
          transition={{ duration: 1 }}
          className="text-xl font-body text-white/90 mt-8 tracking-wider drop-shadow"
        >
          {heroContent.credit}
        </motion.p>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <p className="text-sm text-white/70 tracking-widest animate-pulse drop-shadow">Scroll to explore</p>
      </motion.div>

      <motion.div
        className="absolute bottom-0 -right-48 md:-right-32 z-20 w-full md:w-3/5 max-w-2xl"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
      >
        <img 
          src={actionFigure} 
          alt="Kisthenics" 
          className="w-full h-auto object-contain"
        />
      </motion.div>
    </section>
  )
}

export default Hero