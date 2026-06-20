'use client'
import { useState } from 'react'

interface SidebarItem {
  label: string
  anchor: string
}

interface SidebarSection {
  title: string
  items: SidebarItem[]
}

interface SidebarLayoutProps {
  sections: SidebarSection[]
  children: React.ReactNode
}

export default function SidebarLayout({ sections, children }: SidebarLayoutProps) {
  const [open, setOpen] = useState<Record<string, boolean>>(
    Object.fromEntries(sections.map(s => [s.title, true]))
  )

  const toggle = (title: string) =>
    setOpen(prev => ({ ...prev, [title]: !prev[title] }))

  return (
    <div className="max-w-7xl mx-auto flex" style={{ minHeight: '60vh' }}>
      {/* Sidebar */}
      <aside
        className="hidden lg:block flex-shrink-0 pt-10 pb-16"
        style={{ width: 256, borderRight: '1px solid rgba(255,255,255,0.07)' }}
      >
        <div className="sticky top-24 pr-4 pl-6">
          {sections.map((section) => (
            <div key={section.title} className="mb-1">
              <button
                onClick={() => toggle(section.title)}
                className="flex items-center justify-between w-full py-2 text-left text-sm font-semibold transition-colors"
                style={{ color: open[section.title] ? '#fff' : 'rgba(255,255,255,0.5)' }}
              >
                {section.title}
                <svg
                  className="w-3.5 h-3.5 flex-shrink-0 transition-transform"
                  style={{ opacity: 0.45, transform: open[section.title] ? 'rotate(180deg)' : 'none' }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {open[section.title] && (
                <div className="ml-2 mt-0.5 mb-3">
                  {section.items.map((item) => (
                    <a
                      key={item.anchor}
                      href={`#${item.anchor}`}
                      className="sidebar-link flex items-center py-1.5 pl-3 text-sm rounded-r-lg transition-all border-l-2"
                      style={{
                        color: 'rgba(255,255,255,0.5)',
                        borderColor: 'rgba(255,255,255,0.07)',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.color = '#fff'
                        e.currentTarget.style.borderColor = 'var(--accent-gold)'
                        e.currentTarget.style.background = 'rgba(240,192,64,0.05)'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.color = 'rgba(255,255,255,0.5)'
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                        e.currentTarget.style.background = 'transparent'
                      }}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0 px-6 lg:px-10 pt-10 pb-16">
        {children}
      </div>
    </div>
  )
}
