'use client'

import { useState, useEffect } from 'react'

export function Cursor () {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', updatePosition)

    return () => window.removeEventListener('mousemove', updatePosition)
  }, [])

  return (
    <div
      className='pointer-events-none fixed z-50'
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: 0,
        height: 0,
        borderLeft: '10px solid transparent',
        borderRight: '10px solid transparent',
        borderBottom: '20px solid white',
        transform: 'translate(-50%, -50%) rotate(0)'
      }}
    />
  )
}
