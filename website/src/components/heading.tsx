'use client'

import { useState, useEffect } from 'react'

export function Heading () {
  const [fontSize, setFontSize] = useState(10)
  const [stretch, setStretch] = useState(100)

  useEffect(() => {
    const updateSizes = () => {
      const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
      const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
      const borderWidth = 16 // 8px on each side
      const marqueeHeight = 48 // Increased to account for potentially larger text
      const newSize = Math.min((vw - borderWidth) / 12, (vh - borderWidth - marqueeHeight) / 4)
      setFontSize(newSize)
      setStretch(
        Math.min(300, 100 + ((vh - borderWidth - marqueeHeight) / (vw - borderWidth)) * 100)
      )
    }

    updateSizes()
    window.addEventListener('resize', updateSizes)
    return () => window.removeEventListener('resize', updateSizes)
  }, [])

  return (
    <h1
      className='z-10 text-center font-mono whitespace-nowrap tracking-tighter select-none'
      style={{
        fontSize: `${fontSize}px`,
        transform: `scaleY(${stretch}%)`,
        transformOrigin: 'center center',
        lineHeight: '1'
      }}
    >
      npm install -g
      <br />
      vercel-open
    </h1>
  )
}
