import React, { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, Github, Linkedin } from 'lucide-react'

// Typing animation hook
function useTyping(strings, speed = 80, deleteSpeed = 40, pause = 1800) {
  const [text, setText] = useState('')
  const [strIndex, setStrIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = strings[strIndex]
    const delay = deleting
      ? deleteSpeed
      : charIndex === current.length
      ? pause
      : speed

    const timer = setTimeout(() => {
      if (!deleting && charIndex === current.length) {
        setDeleting(true)
      } else if (deleting && charIndex === 0) {
        setDeleting(false)
        setStrIndex((i) => (i + 1) % strings.length)
      } else {
        setCharIndex((c) => c + (deleting ? -1 : 1))
        setText(current.slice(0, charIndex + (deleting ? -1 : 1)))
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [charIndex, deleting, strIndex, strings, speed, deleteSpeed, pause])

  return text
}

const TYPED_STRINGS = [
  'AI / ML Enthusiast',
  'IoT ',
  'Python Enthusiast',
]

/**
 * Hero – full-screen landing with:
 * • Typing animation
 * • Floating badge
 * • CTA buttons
 * • Scroll-parallax effect on text
 */
export default function Hero() {
  const typedText = useTyping(TYPED_STRINGS)
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const scrollDown = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen grid grid-cols-1 md:grid-cols-2 items-center px-6 md:px-12 overflow-hidden gap-12 md:gap-16"
    >
      {/* Decorative rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[400, 600, 800].map((size, i) => (
          <div
            key={i}
            className="absolute rounded-full border"
            style={{
              width: size,
              height: size,
              borderColor: `rgba(0,245,255,${0.04 - i * 0.01})`,
              animation: `spin ${20 + i * 10}s linear infinite ${i % 2 ? 'reverse' : ''}`,
            }}
          />
        ))}
      </div>

      {/* Left - Text */}
      <motion.div style={{ y, opacity }} className="relative z-10 space-y-6 md:space-y-8">
        {/* Status badge */}
        <motion.div
          className="inline-flex items-center gap-2 glass border border-white/10 rounded-full px-4 py-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="w-2 h-2 rounded-full bg-[var(--neon-green)] animate-pulse" />
          <span className="font-mono text-xs text-[var(--text-secondary)]">Available for Internship / Projects</span>
        </motion.div>

        {/* Greeting */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h1 className="font-display font-black text-4xl md:text-6xl lg:text-7xl leading-tight mb-4 tracking-tight gradient-text bg-clip-text text-transparent drop-shadow-2xl">
            Hi, I'm <span className="text-glow-cyan">Raj Soni</span>
          </h1>
        </motion.div>

        {/* Typing role */}
        <motion.div
          className="font-mono text-xl md:text-2xl lg:text-3xl text-[var(--neon-cyan)] mb-8 h-10 md:h-12 flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span>{typedText}</span>
          <span className="typing-cursor w-1 h-1/2 bg-[var(--neon-cyan)] animate-pulse" />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            data-cursor-hover
            className="px-8 py-4 rounded-2xl font-semibold text-lg text-black shadow-2xl hover:shadow-glow-cyan transition-all duration-300 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))' }}
          >
            View Projects
          </button>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            data-cursor-hover
            className="glass px-8 py-4 rounded-2xl font-semibold text-lg border border-white/20 hover:border-[var(--neon-cyan)] hover:text-[var(--neon-cyan)] transition-all duration-300"
          >
            Contact Me
          </button>
        </motion.div>
      </motion.div>

      {/* Right - Photo + Bio */}
      <motion.div 
        className="hidden md:flex flex-col items-center md:items-end space-y-6 relative z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
      >
        {/* Photo */}
        <div className="w-80 h-96 rounded-3xl overflow-hidden glass border border-white/10 shadow-2xl glow-cyan hover:glow-purple transition-all duration-500 relative group">
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face" 
            alt="Raj Soni"
            className="w-full h-full object-cover rounded-3xl group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {/* Upload your photo here - replace src with /your-photo.jpg in public/images/ */}
          {/* Tip: Save photo as public/images/raj-soni.jpg then src="/images/raj-soni.jpg" */}
        </div>

        {/* Short Bio */}
        <div className="glass max-w-md p-6 rounded-3xl border border-white/10 text-right">
          <p className="font-body text-sm md:text-base leading-relaxed text-[var(--text-secondary)]">
            Hey! Computer Engineering student passionate about AI/ML, IoT, full-stack development. Building intelligent systems and beautiful UIs.
          </p>
        </div>
      </motion.div>

      {/* Scroll down hint */}
      <motion.button
        onClick={scrollDown}
        data-cursor-hover
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--neon-cyan)] transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
      >
        <span className="font-mono text-xs tracking-widest">SCROLL</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ArrowDown size={14} />
        </motion.div>
      </motion.button>
    </section>
  )
}
