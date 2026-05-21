import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { fanLetters } from '../data/content'

const FanNote = ({ message, index }) => {
  const rotations = [-3, 2, -2, 3, -1, 2, -2, 1]
  const rotation = rotations[index % rotations.length]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: rotation }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="p-4 rounded-lg glass hover:bg-white/10 transition-colors"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <p className="font-body text-sm md:text-base text-text-primary italic leading-relaxed">
        "{message}"
      </p>
    </motion.div>
  )
}

const FanLetters = () => {
  const containerRef = useRef()
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [50, 0, 0, -50])

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px]"
          style={{ backgroundColor: '#D4A574', opacity: 0.08 }}
        />
      </div>

      <motion.div style={{ opacity, y }} className="relative z-10 container mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-8xl font-display text-text-primary">
            THE <span className="text-gold">IMPACT</span>
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-20 text-center"
        >
          <p className="text-4xl md:text-5xl font-display text-text-primary leading-tight">
            Your content <span className="text-gold">inspired</span> thousands.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
          {fanLetters.map((message, index) => (
            <FanNote key={index} message={message} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-16"
        >
          <p className="text-3xl font-quote text-gold italic">
            Kadinama Iru
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default FanLetters