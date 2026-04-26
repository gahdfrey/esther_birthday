'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'


function makeConfetti() {
  return Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 6}s`,
    duration: `${4 + Math.random() * 5}s`,
    color: ['#CC5500', '#E8712A', '#9A3F00', '#FFB085', '#FF8C42', '#FFF0E8', '#D46A00', '#F0A060'][i % 8],
    size: 8 + Math.random() * 10,
    shape: i % 3,
  }))
}

const FLOATING_PETALS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: `${5 + i * 8}%`,
  delay: `${i * 0.8}s`,
  duration: `${6 + (i % 4)}s`,
}))

const IMAGES = [
  { id: 1, src: '/WhatsApp Image 2026-04-26 at 09.20.46.jpeg', delay: '0s' },
  { id: 2, src: '/WhatsApp Image 2026-04-26 at 09.20.47.jpeg', delay: '0.15s' },
  { id: 3, src: '/WhatsApp Image 2026-04-26 at 09.20.58.jpeg', delay: '0.3s' },
  { id: 4, src: '/Birthday shoot 4.png', delay: '0.45s' },
  { id: 5, src: '/Birthday shoot 8.png', delay: '0.6s' },
  { id: 6, src: '/WhatsApp Image 2026-04-26 at 10.51.00.jpeg', delay: '0.75s' },
]

function ConfettiPiece({ left, delay, duration, color, size, shape }: {
  left: string; delay: string; duration: string; color: string; size: number; shape: number
}) {
  const borderRadius = shape === 0 ? '50%' : shape === 1 ? '2px' : '50% 0 50% 0'
  return (
    <div
      className="absolute top-0 pointer-events-none"
      style={{
        left, width: size, height: size,
        background: color, borderRadius,
        animation: `confettiFall ${duration} linear ${delay} infinite`,
        opacity: 0.7,
      }}
    />
  )
}

function FloatingPetal({ left, delay, duration }: { left: string; delay: string; duration: string }) {
  return (
    <div
      className="absolute bottom-0 pointer-events-none text-2xl"
      style={{ left, animation: `floatHeart ${duration} ease-in-out ${delay} infinite`, opacity: 0.4 }}
    >
      🌸
    </div>
  )
}

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.12 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return { ref, visible }
}

function ImageCard({ src, delay }: { src: string; delay: string }) {
  const { ref, visible } = useScrollReveal()
  const [hovered, setHovered] = useState(false)

  return (
    <div
      ref={ref}
      className="relative rounded-3xl overflow-hidden cursor-pointer"
      style={{
        aspectRatio: '4/5',
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1) translateY(0)' : 'scale(0.85) translateY(30px)',
        transition: `opacity 0.7s ease ${delay}, transform 0.7s cubic-bezier(0.34,1.56,0.64,1) ${delay}`,
        boxShadow: hovered
          ? '0 30px 60px rgba(204,85,0,0.35), 0 0 40px rgba(204,85,0,0.2)'
          : '0 8px 24px rgba(204,85,0,0.18)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={src}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ transform: hovered ? 'scale(1.06)' : 'scale(1)', transition: 'transform 0.5s ease' }}
      />
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.18), transparent)', opacity: hovered ? 1 : 0.5 }}
      />
      {hovered && (
        <div className="absolute top-3 right-3 text-xl animate-heartbeat">🧡</div>
      )}
    </div>
  )
}

export default function BirthdayPage() {
  const router = useRouter()
  const { ref: msgRef, visible: msgVisible } = useScrollReveal()
  const { ref: imgRef, visible: imgVisible } = useScrollReveal()
  const [heroLoaded, setHeroLoaded] = useState(false)
  const [confetti] = useState<ReturnType<typeof makeConfetti>>(makeConfetti)

  useEffect(() => {
    const t = setTimeout(() => setHeroLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="min-h-screen bg-white">

      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white">
        {/* Warm radial glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute animate-float"
            style={{
              top: '-5%', left: '-5%', width: '70vw', height: '70vw',
              background: 'radial-gradient(circle, rgba(204,85,0,0.07) 0%, transparent 65%)',
            }}
          />
          <div
            className="absolute animate-float"
            style={{
              bottom: '-10%', right: '-5%', width: '60vw', height: '60vw',
              background: 'radial-gradient(circle, rgba(232,113,42,0.08) 0%, transparent 65%)',
              animationDelay: '2s',
            }}
          />
          <div
            className="absolute animate-float"
            style={{
              top: '35%', right: '10%', width: '35vw', height: '35vw',
              background: 'radial-gradient(circle, rgba(204,85,0,0.05) 0%, transparent 65%)',
              animationDelay: '1s',
            }}
          />
        </div>

        {/* Top border accent */}
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{ background: 'linear-gradient(90deg, transparent, #CC5500, #E8712A, #CC5500, transparent)' }}
        />

        {/* Confetti */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {confetti.map((p) => <ConfettiPiece key={p.id} {...p} />)}
        </div>

        {/* Floating petals */}
        {FLOATING_PETALS.map((p) => <FloatingPetal key={p.id} {...p} />)}

        {/* Hero content */}
        <div className="relative z-10 text-center px-6 flex flex-col items-center gap-8 max-w-4xl">
          {/* Top decoration */}
          <div
            className="flex gap-3 text-3xl"
            style={{
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? 'translateY(0)' : 'translateY(-30px)',
              transition: 'opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s',
            }}
          >
            <span className="animate-float" style={{ animationDelay: '0s' }}>🌸</span>
            <span className="animate-twinkle" style={{ animationDelay: '0.3s', color: '#CC5500' }}>✦</span>
            <span className="animate-heartbeat">🧡</span>
            <span className="animate-twinkle" style={{ animationDelay: '0.6s', color: '#CC5500' }}>✦</span>
            <span className="animate-float" style={{ animationDelay: '0.9s' }}>🌸</span>
          </div>

          {/* Main title */}
          <div
            style={{
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.9)',
              transition: 'opacity 1s ease 0.3s, transform 1s cubic-bezier(0.34,1.56,0.64,1) 0.3s',
            }}
          >
            <h1
              className="font-bold leading-tight"
              style={{
                fontSize: 'clamp(2.8rem, 8vw, 6rem)',
                fontFamily: 'Georgia, "Times New Roman", serif',
                color: '#1a1008',
                lineHeight: 1.1,
              }}
            >
              Happy Birthday,
            </h1>
            <h1
              className="font-bold leading-tight mt-2"
              style={{
                fontSize: 'clamp(3.5rem, 10vw, 7.5rem)',
                fontFamily: 'Georgia, "Times New Roman", serif',
                letterSpacing: '-0.02em',
              }}
            >
              Esther! 🎂
            </h1>
          </div>

          {/* Subtitle */}
          <p
            className="text-lg md:text-xl max-w-lg"
            style={{
              fontFamily: 'Georgia, serif',
              fontStyle: 'italic',
              letterSpacing: '0.03em',
              color: '#9A3F00',
              opacity: heroLoaded ? 0.85 : 0,
              transform: heroLoaded ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.8s ease 0.6s, transform 0.8s ease 0.6s',
            }}
          >
            Today the universe paused, just to celebrate you 🌙
          </p>

          {/* Scroll hint */}
          <div style={{ opacity: heroLoaded ? 1 : 0, transition: 'opacity 0.8s ease 1s' }}>
            <div className="flex flex-col items-center gap-2 text-sm" style={{ color: '#CC5500', opacity: 0.6 }}>
              <span className="animate-glow-text">Scroll down for your message</span>

              {/* <div className="animate-scroll-bounce text-2xl">🧡</div> */}
            </div>
          </div>
                                  <DotLottieReact
                          src="/Teddy Bear.json"
                          loop
                          autoplay
                          style={{ width: 160, height: 190 }}
                        />
        </div>

        {/* Bottom border accent */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(204,85,0,0.3), transparent)' }}
        />
      </section>

      {/* ===== MESSAGE SECTION ===== */}
      <section className="relative py-24 px-6 overflow-hidden bg-white">
        {/* Faint warm tint */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(204,85,0,0.04) 0%, transparent 70%)' }}
        />

        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Section header */}
          <div
            ref={msgRef}
            className="text-center mb-16"
            style={{
              opacity: msgVisible ? 1 : 0,
              transform: msgVisible ? 'translateY(0)' : 'translateY(50px)',
              transition: 'opacity 0.9s ease, transform 0.9s ease',
            }}
          >
            <div className="flex justify-center gap-3 text-2xl mb-6">
              {['🧡', '🧡', '🧡'].map((e, i) => (
                <span key={i} className="animate-heartbeat" style={{ animationDelay: `${i * 0.3}s` }}>{e}</span>
              ))}
            </div>
            <h2
              className="font-bold orange-gradient-text"
              style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontFamily: 'Georgia, serif' }}
            >
              A Message From the Heart
            </h2>
          </div>

          {/* Message card */}
          <div
            className="rounded-3xl p-8 md:p-12 animate-glow"
            style={{
              background: '#ffffff',
              border: '1.5px solid rgba(204,85,0,0.15)',
              boxShadow: '0 8px 40px rgba(204,85,0,0.1), 0 2px 8px rgba(0,0,0,0.04)',
              opacity: msgVisible ? 1 : 0,
              transform: msgVisible ? 'scale(1) translateY(0)' : 'scale(0.92) translateY(40px)',
              transition: 'opacity 0.9s ease 0.2s, transform 0.9s cubic-bezier(0.34,1.56,0.64,1) 0.2s',
            }}
          >
            {/* Quote mark */}
            <div
              className="text-8xl leading-none mb-4 -mt-4"
              style={{ color: 'rgba(204,85,0,0.18)', fontFamily: 'Georgia, serif', lineHeight: 1 }}
            >
              &ldquo;
            </div>

            <div className="space-y-6" style={{ fontFamily: 'Georgia, serif', lineHeight: 1.9, color: '#3a2010' }}>
              <p
                className="text-lg md:text-xl"
                style={{
                  opacity: msgVisible ? 1 : 0,
                  transform: msgVisible ? 'translateX(0)' : 'translateX(-40px)',
                  transition: 'opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s',
                }}
              >
                My dearest{' '}
                <span className="font-semibold orange-gradient-text">Esther</span>, on this very special day,
                I want you to know just how extraordinary you truly are. You came into this world and
                made it infinitely brighter, warmer, and more beautiful simply by being you.
              </p>

              <p
                className="text-lg md:text-xl"
                style={{
                  opacity: msgVisible ? 1 : 0,
                  transform: msgVisible ? 'translateX(0)' : 'translateX(40px)',
                  transition: 'opacity 0.8s ease 0.6s, transform 0.8s ease 0.6s',
                }}
              >
                Every laugh you share is a gift 🎁, every smile a ray of sunshine ☀️, and every moment
                spent with you is a treasure I hold close to my heart. You are the kind of person who
                makes the whole room glow — effortlessly, naturally, perfectly.
              </p>

              <p
                className="text-lg md:text-xl"
                style={{
                  opacity: msgVisible ? 1 : 0,
                  transform: msgVisible ? 'translateX(0)' : 'translateX(-40px)',
                  transition: 'opacity 0.8s ease 0.8s, transform 0.8s ease 0.8s',
                }}
              >
                Today is your day,{' '}
                <span className="font-semibold orange-gradient-text">baby</span>. A day the
                stars aligned and the universe decided the world needed someone as magical as you. May
                this birthday shower you with all the love, joy, and magic you deserve — because you
                deserve absolutely everything 💫
              </p>

              {/* Accent line */}
              <div
                className="flex items-center gap-4 py-2"
                style={{
                  opacity: msgVisible ? 1 : 0,
                  transition: 'opacity 0.8s ease 0.9s',
                }}
              >
                <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(204,85,0,0.25))' }} />
                <span style={{ color: '#CC5500', fontSize: '1.2rem' }}>✦</span>
                <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(204,85,0,0.25), transparent)' }} />
              </div>

              <p
                className="text-xl md:text-2xl font-semibold text-center pt-2 orange-gradient-text"
                style={{
                  opacity: msgVisible ? 1 : 0,
                  transition: 'opacity 0.8s ease 1s',
                }}
              >
                You dey craze me every single day 🧡
              </p>
            </div>

            {/* Closing quote */}
            <div
              className="text-8xl leading-none text-right mt-4 -mb-4"
              style={{ color: 'rgba(204,85,0,0.18)', fontFamily: 'Georgia, serif', lineHeight: 1 }}
            >
              &rdquo;
            </div>
          </div>

          {/* Signature */}
          <div
            className="text-center mt-10"
            style={{ opacity: msgVisible ? 1 : 0, transition: 'opacity 0.8s ease 1.2s' }}
          >
            <p
              className="text-base italic"
              style={{ fontFamily: 'Georgia, serif', color: '#CC5500', opacity: 0.65 }}
            >
              — With all my love, always 🌹
            </p>
          </div>
        </div>
      </section>

      {/* ===== IMAGES SECTION ===== */}
      <section
        className="relative py-24 px-6 overflow-hidden"
        style={{ background: '#FFF7F2' }}
      >
        {/* Subtle bg decorations */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute animate-float"
            style={{
              top: '10%', right: '-60px', width: '280px', height: '280px',
              background: 'radial-gradient(circle, rgba(204,85,0,0.06) 0%, transparent 70%)',
            }}
          />
          <div
            className="absolute animate-float"
            style={{
              bottom: '10%', left: '-60px', width: '260px', height: '260px',
              background: 'radial-gradient(circle, rgba(232,113,42,0.06) 0%, transparent 70%)',
              animationDelay: '1.5s',
            }}
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Header */}
          <div
            ref={imgRef}
            className="text-center mb-14"
            style={{
              opacity: imgVisible ? 1 : 0,
              transform: imgVisible ? 'translateY(0)' : 'translateY(50px)',
              transition: 'opacity 0.9s ease, transform 0.9s ease',
            }}
          >
            <div className="flex justify-center gap-2 text-2xl mb-5">
              {['📸', '🌸', '🧡', '🌸', '📸'].map((e, i) => (
                <span key={i} className="animate-float" style={{ animationDelay: `${i * 0.2}s` }}>{e}</span>
              ))}
            </div>
            <h2
              className="font-bold orange-gradient-text"
              style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontFamily: 'Georgia, serif' }}
            >
              Moments &amp; Memories
            </h2>
            <p
              className="mt-3 text-base italic"
              style={{ fontFamily: 'Georgia, serif', color: '#9A3F00', opacity: 0.65 }}
            >
              Every picture tells a story — ours is my favourite 🎞️
            </p>
          </div>

          {/* Image grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {IMAGES.map((img) => <ImageCard key={img.id} src={img.src} delay={img.delay} />)}
          </div>

          {/* Gallery button */}
          <div className="flex justify-center mt-10">
            <button
              onClick={() => router.push('/gallery')}
              className="rounded-2xl px-8 py-4 font-bold text-base tracking-wide text-white"
              style={{
                background: 'linear-gradient(135deg, #CC5500, #E8712A, #CC5500)',
                backgroundSize: '200% 200%',
                boxShadow: '0 8px 28px rgba(204,85,0,0.3)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-3px) scale(1.03)'
                ;(e.currentTarget as HTMLButtonElement).style.boxShadow = '0 16px 40px rgba(204,85,0,0.4)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.transform = ''
                ;(e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 28px rgba(204,85,0,0.3)'
              }}
            >
              Click to explore gallery
            </button>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="relative py-16 px-6 text-center bg-white" style={{ borderTop: '1px solid rgba(204,85,0,0.1)' }}>
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-2 text-3xl">
            {['🧡', '🎂', '🧡'].map((e, i) => (
              <span key={i} className="animate-heartbeat" style={{ animationDelay: `${i * 0.4}s` }}>{e}</span>
            ))}
          </div>
          <p
            className="text-sm italic"
            style={{ fontFamily: 'Georgia, serif', color: '#CC5500', opacity: 0.7 }}
          >
            Happy Birthday, Esther — today and always 🌹
          </p>
          <p className="text-xs" style={{ color: '#CC5500', opacity: 0.35 }}>Made with infinite love 🧡</p>
        </div>
      </footer>
    </div>
  )
}
