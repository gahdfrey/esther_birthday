'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

const FLOATING_HEARTS = [
  { id: 1, left: '5%', delay: '0s', duration: '8s', size: 20 },
  { id: 2, left: '15%', delay: '1.5s', duration: '10s', size: 14 },
  { id: 3, left: '25%', delay: '3s', duration: '7s', size: 24 },
  { id: 4, left: '40%', delay: '0.8s', duration: '9s', size: 16 },
  { id: 5, left: '55%', delay: '2.2s', duration: '11s', size: 20 },
  { id: 6, left: '65%', delay: '4s', duration: '8s', size: 12 },
  { id: 7, left: '78%', delay: '1s', duration: '9.5s', size: 22 },
  { id: 8, left: '88%', delay: '3.5s', duration: '7.5s', size: 18 },
  { id: 9, left: '93%', delay: '2s', duration: '12s', size: 14 },
  { id: 10, left: '48%', delay: '5s', duration: '8.5s', size: 26 },
]

const SPARKLES = [
  { id: 1, top: '8%', left: '12%', delay: '0s', size: 16 },
  { id: 2, top: '15%', left: '82%', delay: '0.7s', size: 12 },
  { id: 3, top: '25%', left: '5%', delay: '1.4s', size: 10 },
  { id: 4, top: '70%', left: '90%', delay: '0.3s', size: 14 },
  { id: 5, top: '80%', left: '8%', delay: '1s', size: 11 },
  { id: 6, top: '35%', left: '95%', delay: '2s', size: 13 },
  { id: 7, top: '55%', left: '3%', delay: '1.7s', size: 15 },
  { id: 8, top: '90%', left: '75%', delay: '0.5s', size: 10 },
]


function FloatingHeart({ left, delay, duration, size }: { left: string; delay: string; duration: string; size: number }) {
  return (
    <div
      className="absolute pointer-events-none select-none"
      style={{
        left,
        bottom: '-60px',
        fontSize: `${size}px`,
        animation: `floatHeart ${duration} linear ${delay} infinite`,
        opacity: 0.5,
      }}
    >
      🧡
    </div>
  )
}

function Sparkle({ top, left, delay, size }: { top: string; left: string; delay: string; size: number }) {
  return (
    <div
      className="absolute pointer-events-none select-none animate-twinkle"
      style={{ top, left, fontSize: `${size}px`, animationDelay: delay, color: '#CC5500' }}
    >
      ✦
    </div>
  )
}

export default function Home() {
  const [password, setPassword] = useState('')
  const [shake, setShake] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [loaded, setLoaded] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    const raf = requestAnimationFrame(() => setLoaded(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password.toLowerCase().trim() === 'Yellow') {
      setSuccess(true)
      setErrorMsg('')
      setTimeout(() => router.push('/birthday'), 1400)
    } else {
      setShake(true)
      setErrorMsg("Hmm, that's not it... try again my love 🧡")
      setTimeout(() => {
        setShake(false)
        inputRef.current?.focus()
      }, 600)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-white">
      {/* Warm radial glow spots on white */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute animate-float"
          style={{
            top: '-10%', left: '-10%', width: '60vw', height: '60vw',
            background: 'radial-gradient(circle, rgba(204,85,0,0.06) 0%, transparent 70%)',
            animationDelay: '0s',
          }}
        />
        <div
          className="absolute animate-float"
          style={{
            bottom: '-15%', right: '-10%', width: '55vw', height: '55vw',
            background: 'radial-gradient(circle, rgba(232,113,42,0.07) 0%, transparent 70%)',
            animationDelay: '2s',
          }}
        />
        <div
          className="absolute animate-float"
          style={{
            top: '40%', right: '5%', width: '30vw', height: '30vw',
            background: 'radial-gradient(circle, rgba(204,85,0,0.05) 0%, transparent 70%)',
            animationDelay: '1s',
          }}
        />
      </div>

      {/* Floating orange hearts */}
      {FLOATING_HEARTS.map((h) => (
        <FloatingHeart key={h.id} left={h.left} delay={h.delay} duration={h.duration} size={h.size} />
      ))}

      {/* Sparkles */}
      {SPARKLES.map((s) => (
        <Sparkle key={s.id} top={s.top} left={s.left} delay={s.delay} size={s.size} />
      ))}

      {/* Main card */}
      <div
        className={`love-card relative z-10 rounded-3xl px-8 py-8 flex flex-col items-center gap-4 w-full max-w-md mx-6 sm:mx-4 sm:py-10 sm:gap-6 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        style={{ transitionDelay: '0.15s' }}
      >
        {/* Top decoration */}
        <div className="flex gap-2 text-2xl animate-float" style={{ animationDelay: '0.5s' }}>
          <span>🌸</span>
          <span className="animate-heartbeat" style={{ animationDelay: '0.3s' }}>🧡</span>
          <span>🌸</span>
        </div>

        {/* Bear */}
        <div className="relative">
          <DotLottieReact
            src="/Cute teddy bear with a gift.json"
            loop
            autoplay
            style={{ width: 160, height: 190 }}
          />
          <div
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-4 rounded-full blur-xl"
            style={{ background: 'rgba(204,85,0,0.2)' }}
          />
        </div>

        {/* Title */}
        <div
          className={`text-center transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: '0.35s' }}
        >
          <h1
            className="text-2xl font-bold mb-1 animate-glow-text"
            style={{ fontFamily: 'Georgia, serif', letterSpacing: '0.02em', color: '#1a1008' }}
          >
            Enter the Amazing Password
          </h1>
          <p style={{ color: '#CC5500', opacity: 0.8 }} className="text-sm font-medium">
            Only the special one knows this 🔐
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className={`w-full flex flex-col gap-4 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: '0.5s' }}
        >
          <div className={shake ? 'animate-shake' : ''}>
            <input
              ref={inputRef}
              type="text"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setErrorMsg('')
              }}
              placeholder="Type the secret password... 💌"
              disabled={success}
              className="love-input w-full rounded-2xl px-5 py-4 text-base font-medium"
              style={{ caretColor: '#CC5500' }}
              autoComplete="off"
              spellCheck={false}
            />
          </div>

          {errorMsg && (
            <p className="text-sm text-center animate-fade-in-up font-medium" style={{ color: '#CC5500' }}>
              {errorMsg}
            </p>
          )}

          {success && (
            <p className="text-sm text-center animate-fade-in-up font-semibold" style={{ color: '#2d8a4e' }}>
              Yes! That&apos;s right! 🎉 Opening your message...
            </p>
          )}

          <button
            type="submit"
            disabled={success || !password.trim()}
            className="w-full rounded-2xl py-4 font-bold text-base tracking-wide disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background: 'linear-gradient(135deg, #CC5500, #E8712A, #CC5500)',
              backgroundSize: '200% 200%',
              color: 'white',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-3px) scale(1.03)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 16px 36px rgba(204,85,0,0.35)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = ''; (e.currentTarget as HTMLButtonElement).style.boxShadow = ''; }}
          >
            {success ? '✨ Opening magic... ✨' : 'Unlock your message 🧡'}
          </button>
        </form>

        {/* Divider */}
        <div className="w-full flex items-center gap-3">
          <div className="flex-1 h-px" style={{ background: 'rgba(204,85,0,0.12)' }} />
          <span className="text-xs" style={{ color: '#CC5500', opacity: 0.5 }}>✦</span>
          <div className="flex-1 h-px" style={{ background: 'rgba(204,85,0,0.12)' }} />
        </div>

        <p className="text-xs text-center" style={{ color: '#CC5500', opacity: 0.45 }}>
          Made with 🧡 just for you
        </p>
      </div>
    </div>
  )
}
