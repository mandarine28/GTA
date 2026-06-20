'use client'

import { useState, useEffect } from 'react'

const RELEASE = new Date('2026-11-19T00:00:00')

export default function Countdown() {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const update = () => {
      const diff = RELEASE.getTime() - Date.now()
      if (diff <= 0) return
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      })
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  const units = [
    { label: 'Jours', value: time.days },
    { label: 'Heures', value: time.hours },
    { label: 'Minutes', value: time.minutes },
    { label: 'Secondes', value: time.seconds },
  ]

  return (
    <div className="flex items-center gap-3">
      {units.map(({ label, value }, i) => (
        <div key={label} className="flex items-center gap-3">
          <div className="text-center">
            <div className="text-3xl font-black tabular-nums" style={{ color: 'var(--accent-gold)', minWidth: '2.5ch' }}>
              {String(value).padStart(2, '0')}
            </div>
            <div className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>
              {label}
            </div>
          </div>
          {i < 3 && <span className="text-2xl font-black mb-4" style={{ color: 'var(--accent-gold)', opacity: 0.4 }}>:</span>}
        </div>
      ))}
    </div>
  )
}
