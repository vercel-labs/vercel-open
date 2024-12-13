import React from 'react'

import MarqueeBase from 'react-fast-marquee'
import { cn } from '@/lib/utils'

export function Marquee (
  {
    position = 'bottom',
    direction = 'right'
  }: {
    position?: 'top' | 'bottom'
    direction?: 'left' | 'right'
  } = {
    position: 'bottom',
    direction: 'right'
  }
) {
  const classNamePosition = position === 'top' ? '' : 'bottom-0 left-0 right-0'
  return (
    <div className={cn('overflow-hidden text-white py-6 absolute select-none', classNamePosition)}>
      <div className='whitespace-nowrap inline-block font-mono text-lg text-foreground'>
        <MarqueeBase autoFill direction={direction}>
          Breaking news Vercel stocks now available &nbsp;&nbsp;&nbsp; Hackathon 2024
          &nbsp;&nbsp;&nbsp; Merry Christmas and a Happy New Year &nbsp;&nbsp;&nbsp; Breaking news
          Vercel stocks now available &nbsp;&nbsp;&nbsp; Hackathon 2024 &nbsp;&nbsp;&nbsp; Merry
          Christmas and a Happy New Year &nbsp;&nbsp;&nbsp;
        </MarqueeBase>
      </div>
    </div>
  )
}
