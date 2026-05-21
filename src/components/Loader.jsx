import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import actionFigure from '../assets/IMG_7877.png'

const Loader = ({ onComplete }) => {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false)
      setTimeout(onComplete, 500)
    }, 1500)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="w-64 md:w-80"
          >
            <img 
              src={actionFigure} 
              alt="Kisthenics" 
              className="w-full h-auto object-contain"
            />
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-center mt-4"
            >
              <p className="text-gold font-display text-xl tracking-widest">KISTHENICS</p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Loader