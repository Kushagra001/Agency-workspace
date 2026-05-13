import React from 'react'

interface BrowserMockupProps {
  url: string
  children: React.ReactNode
  className?: string
  scale?: number
  dark?: boolean
}

export function BrowserMockup({ url, children, className, scale = 1, dark = false }: BrowserMockupProps) {
  const chrome = dark
    ? { bg: '#2a2520', border: '#3a3530', bar: '#1a1612', text: '#6b6560', dot1: '#3a3530', dot2: '#3a3530', dot3: '#3a3530' }
    : { bg: '#f5f5f5', border: '#e5e5e5', bar: '#ffffff', text: '#a3a3a3', dot1: '#e5e5e5', dot2: '#e5e5e5', dot3: '#e5e5e5' }

  return (
    <div className={className} style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
      <div style={{ backgroundColor: chrome.bg, border: `1px solid ${chrome.border}`, borderBottom: 'none' }} className="rounded-t-lg overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="flex items-center gap-1.5">
            {[chrome.dot1, chrome.dot2, chrome.dot3].map((c, i) => (
              <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: c }} />
            ))}
          </div>

          <div className="flex-1 flex items-center gap-2 rounded px-3 py-1" style={{ backgroundColor: chrome.bar, border: `1px solid ${chrome.border}` }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
              <rect x="2" y="5" width="6" height="4" rx="0.5" stroke={chrome.text} strokeWidth="0.75" />
              <path d="M3.5 5V3.5a1.5 1.5 0 013 0V5" stroke={chrome.text} strokeWidth="0.75" fill="none" />
            </svg>
            <span className="text-[10px] truncate" style={{ color: chrome.text, fontFamily: 'var(--font-mono)' }}>{url}</span>
          </div>

          <div style={{ width: 42 }} />
        </div>
      </div>

      <div style={{ border: `1px solid ${chrome.border}`, borderTop: 'none' }} className="overflow-hidden rounded-b-lg">
        {children}
      </div>
    </div>
  )
}
