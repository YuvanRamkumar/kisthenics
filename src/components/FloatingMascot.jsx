import { motion, useScroll, useTransform } from 'framer-motion'
import { useState } from 'react'
import actionFigure from '../assets/IMG_7877.png'

const FloatingMascot = ({ instagramLink = "https://www.instagram.com/kisthenics2024" }) => {
  const [isHovered, setIsHovered] = useState(false)
  const { scrollYProgress } = useScroll()

  const y = useTransform(scrollYProgress, [0, 1], [0, -100])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 5])

  return (
    <motion.div
      style={{ y, rotate }}
      className="fixed bottom-8 right-8 z-40 md:bottom-12 md:right-12"
    >
      <a
        href={instagramLink}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          animate={{
            scale: isHovered ? 1.15 : 1,
            boxShadow: isHovered 
              ? "0 0 40px rgba(212, 165, 116, 0.6)" 
              : "0 0 20px rgba(212, 165, 116, 0.3)"
          }}
          transition={{ duration: 0.3 }}
          className="w-20 md:w-28 cursor-pointer"
        >
          <img 
            src={actionFigure} 
            alt="Kisthenics" 
            className="w-full h-auto object-contain rounded-full"
          />
        </motion.div>
      </a>

      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ 
          opacity: isHovered ? 1 : 0, 
          y: isHovered ? 0 : -10 
        }}
        className="text-center text-xs text-gold mt-2 font-body"
      >
        Follow on Instagram
      </motion.p>
    </motion.div>
  )
}

export default FloatingMascot