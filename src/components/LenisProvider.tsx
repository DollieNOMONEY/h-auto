'use client'
import Lenis from 'lenis'
import { useEffect } from 'react'

export default function LenisProvider() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      gestureOrientation: 'vertical',
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    })

    const raf = (time: DOMHighResTimeStamp) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  return null
}
