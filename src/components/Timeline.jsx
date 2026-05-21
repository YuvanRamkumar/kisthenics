import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { timeline } from '../data/content'

const TimelineItem = ({ item, index }) => {
  const [counted, setCounted] = useState(false)
  const [displayNumber, setDisplayNumber] = useState(0)

  useEffect(() => {
    if (counted) return

    const num = parseInt(item.stat.replace(/[^0-9]/g, '')) || 0
    const duration = 2000
    const steps = 60
    const increment = num / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= num) {
        setDisplayNumber(num)
        setCounted(true)
        clearInterval(timer)
      } else {
        setDisplayNumber(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [item.stat, counted])

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: false, amount: 0.3 }}
      className="relative flex items-center w-full mb-8"
    >
      <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-16 md:text-right pr-4' : 'md:pl-16 md:order-2 pl-4 order-2'}`}>
        <div className="glass rounded-xl p-5 md:p-6 inline-block w-full max-w-md">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl md:text-4xl font-display text-gold">{item.year}</span>
            {index % 2 === 0 && <div className="h-px flex-1 bg-gradient-to-l from-gold/50 to-transparent" />}
            {index % 2 !== 0 && <div className="h-px flex-1 bg-gradient-to-r from-gold/50 to-transparent" />}
          </div>

          <h3 className="text-xl md:text-2xl font-display text-white mb-2">
            {item.title}
          </h3>

          <p className="font-body text-white/70 text-sm mb-3 leading-relaxed">
            {item.description}
          </p>

          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-2xl md:text-3xl font-display text-gold">
              {item.stat}
            </span>
            <span className="font-body text-white/60 text-sm">
              {item.statLabel}
            </span>
          </div>

          {item.quote && (
            <span className="text-lg font-quote text-gold italic">
              "{item.quote}"
            </span>
          )}
        </div>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gold shadow-[0_0_20px_#F59E0B] z-10">
        <div className="absolute inset-0 rounded-full bg-gold animate-ping opacity-50" />
      </div>

      <div className={`flex-1 ${index % 2 === 0 ? 'md:order-2 md:pl-16 pl-4' : 'md:pr-16 md:text-right pr-4'}`} />
    </motion.div>
  )
}

const Timeline = () => {
  const containerRef = useRef()
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -50])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen py-20"
    >
      <motion.div style={{ y }} className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%]">
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] h-full bg-gradient-to-b from-transparent via-gold to-transparent"
          />
        </div>
      </motion.div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-display text-white mb-4">
            LEGENDARY <span className="text-gold">MOMENTS</span>
          </h2>
          <p className="text-center font-body text-white/60 text-lg">
            The journey that inspired thousands
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {timeline.map((item, index) => (
            <TimelineItem
              key={item.year}
              item={item}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Timeline