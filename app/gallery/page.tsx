'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

const IMAGES = [
  '/WhatsApp Image 2026-04-26 at 09.20.46.jpeg',
  '/WhatsApp Image 2026-04-26 at 09.20.46 (1).jpeg',
  '/WhatsApp Image 2026-04-26 at 09.20.46 (2).jpeg',
  '/WhatsApp Image 2026-04-26 at 09.20.46 (3).jpeg',
  '/WhatsApp Image 2026-04-26 at 09.20.47.jpeg',
  '/WhatsApp Image 2026-04-26 at 09.20.58.jpeg',
  '/WhatsApp Image 2026-04-26 at 09.20.59.jpeg',
  '/WhatsApp Image 2026-04-26 at 09.21.00.jpeg',
  '/WhatsApp Image 2026-04-26 at 09.20.27.jpeg',
  '/WhatsApp Image 2026-04-26 at 09.20.27 (1).jpeg',
  '/WhatsApp Image 2026-04-26 at 09.20.27 (2).jpeg',
  '/WhatsApp Image 2026-04-26 at 09.20.27 (3).jpeg',
  '/WhatsApp Image 2026-04-26 at 09.20.27 (4).jpeg',
  '/WhatsApp Image 2026-04-26 at 09.20.27 (5).jpeg',
  '/WhatsApp Image 2026-04-26 at 09.20.32.jpeg',
  '/WhatsApp Image 2026-04-26 at 09.20.32 (1).jpeg',
  '/WhatsApp Image 2026-04-26 at 09.20.33.jpeg',
  '/WhatsApp Image 2026-04-26 at 09.20.33 (1).jpeg',
  '/WhatsApp Image 2026-04-26 at 09.20.33 (2).jpeg',
]

const VIDEOS = [
  '/WhatsApp Video 2026-04-26 at 09.20.31.mp4',
  '/WhatsApp Video 2026-04-26 at 09.20.32.mp4',
  '/WhatsApp Video 2026-04-26 at 09.20.35.mp4',
  '/WhatsApp Video 2026-04-26 at 09.20.38.mp4',
  '/WhatsApp Video 2026-04-26 at 09.20.44.mp4',
]

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.08 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return { ref, visible }
}

function PhotoItem({ src, index }: { src: string; index: number }) {
  const { ref, visible } = useScrollReveal()
  const [hovered, setHovered] = useState(false)
  const delay = `${(index % 6) * 0.08}s`

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-2xl mb-4 cursor-pointer"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.96)',
        transition: `opacity 0.6s ease ${delay}, transform 0.6s cubic-bezier(0.34,1.56,0.64,1) ${delay}`,
        boxShadow: hovered
          ? '0 20px 48px rgba(204,85,0,0.3)'
          : '0 4px 16px rgba(0,0,0,0.1)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={src}
        alt=""
        className="w-full h-auto block"
        style={{
          transform: hovered ? 'scale(1.04)' : 'scale(1)',
          transition: 'transform 0.5s ease',
        }}
      />
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(to top, rgba(204,85,0,0.15), transparent)',
          opacity: hovered ? 1 : 0,
        }}
      />
      {hovered && (
        <div className="absolute top-2 right-2 text-lg animate-heartbeat">🧡</div>
      )}
    </div>
  )
}

function VideoItem({ src, index }: { src: string; index: number }) {
  const { ref, visible } = useScrollReveal()
  const [hovered, setHovered] = useState(false)
  const delay = `${(index % 3) * 0.1}s`

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-2xl mb-4"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.96)',
        transition: `opacity 0.6s ease ${delay}, transform 0.6s cubic-bezier(0.34,1.56,0.64,1) ${delay}`,
        boxShadow: hovered
          ? '0 20px 48px rgba(204,85,0,0.35)'
          : '0 4px 20px rgba(0,0,0,0.12)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-auto block"
        style={{
          transform: hovered ? 'scale(1.03)' : 'scale(1)',
          transition: 'transform 0.5s ease',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: 'linear-gradient(to top, rgba(204,85,0,0.2), transparent 60%)',
          opacity: hovered ? 1 : 0.4,
        }}
      />
      <div
        className="absolute bottom-2 left-2 text-xs font-semibold px-2 py-1 rounded-full"
        style={{ background: 'rgba(204,85,0,0.85)', color: 'white', backdropFilter: 'blur(4px)' }}
      >
        Video
      </div>
    </div>
  )
}

export default function GalleryPage() {
  const router = useRouter()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80)
    return () => clearTimeout(t)
  }, [])

  // Interleave videos into image columns for a natural mix
  const col1: { type: 'img' | 'vid'; src: string; idx: number }[] = []
  const col2: { type: 'img' | 'vid'; src: string; idx: number }[] = []
  const col3: { type: 'img' | 'vid'; src: string; idx: number }[] = []

  const allMedia = [
    ...IMAGES.map((src) => ({ type: 'img' as const, src })),
    ...VIDEOS.map((src) => ({ type: 'vid' as const, src })),
  ]

  allMedia.forEach((item, i) => {
    const entry = { ...item, idx: i }
    if (i % 3 === 0) col1.push(entry)
    else if (i % 3 === 1) col2.push(entry)
    else col3.push(entry)
  })

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div
        className="sticky top-0 z-20 px-6 py-4 flex items-center gap-4"
        style={{
          background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(204,85,0,0.1)',
        }}
      >
        <button
          onClick={() => router.push('/birthday')}
          className="flex items-center gap-2 text-sm font-medium rounded-xl px-4 py-2"
          style={{ color: '#CC5500', background: 'rgba(204,85,0,0.08)', transition: 'background 0.2s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(204,85,0,0.15)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(204,85,0,0.08)' }}
        >
          ← Back
        </button>
        <div className="flex-1 text-center">
          <h1
            className="font-bold orange-gradient-text"
            style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.1rem, 4vw, 1.5rem)' }}
          >
            Gallery
          </h1>
        </div>
        <div style={{ width: 72 }} />
      </div>

      {/* Hero text */}
      <div
        className="text-center pt-12 pb-8 px-6"
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}
      >
        <p
          className="text-base italic"
          style={{ fontFamily: 'Georgia, serif', color: '#9A3F00', opacity: 0.7 }}
        >
          Every picture, every moment — all ours 🧡
        </p>
      </div>

      {/* Masonry grid */}
      <div className="px-3 sm:px-6 pb-16 max-w-6xl mx-auto">
        {/* 3-col on desktop, 2-col on mobile */}
        <div className="hidden md:grid md:grid-cols-3 gap-4">
          <div>
            {col1.map((item) =>
              item.type === 'img'
                ? <PhotoItem key={item.src} src={item.src} index={item.idx} />
                : <VideoItem key={item.src} src={item.src} index={item.idx} />
            )}
          </div>
          <div className="mt-8">
            {col2.map((item) =>
              item.type === 'img'
                ? <PhotoItem key={item.src} src={item.src} index={item.idx} />
                : <VideoItem key={item.src} src={item.src} index={item.idx} />
            )}
          </div>
          <div className="mt-4">
            {col3.map((item) =>
              item.type === 'img'
                ? <PhotoItem key={item.src} src={item.src} index={item.idx} />
                : <VideoItem key={item.src} src={item.src} index={item.idx} />
            )}
          </div>
        </div>

        {/* 2-col on mobile */}
        <div className="grid grid-cols-2 gap-3 md:hidden">
          {allMedia.map((item, i) =>
            item.type === 'img'
              ? <PhotoItem key={item.src} src={item.src} index={i} />
              : <VideoItem key={item.src} src={item.src} index={i} />
          )}
        </div>
      </div>

      {/* Footer */}
      <footer
        className="py-10 text-center"
        style={{ borderTop: '1px solid rgba(204,85,0,0.1)' }}
      >
        <div className="flex justify-center gap-2 text-2xl mb-3">
          {['🧡', '🌸', '🧡'].map((e, i) => (
            <span key={i} className="animate-heartbeat" style={{ animationDelay: `${i * 0.4}s` }}>{e}</span>
          ))}
        </div>
        <p className="text-xs" style={{ color: '#CC5500', opacity: 0.4, fontFamily: 'Georgia, serif' }}>
          Made with infinite love 🧡
        </p>
      </footer>
    </div>
  )
}
