export function ArcaMockup() {
  return (
    <div className="w-full relative overflow-hidden" style={{ backgroundColor: '#ffffff', height: '100%', minHeight: 280 }}>
      <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
        <span className="text-[12px]" style={{ fontFamily: 'Georgia, serif', color: '#0a0a0a' }}>Arca</span>
        <div className="flex gap-4">
          {['Work','About','Services'].map(l => (
            <span key={l} className="text-[9px]" style={{ color: '#a3a3a3' }}>{l}</span>
          ))}
        </div>
      </div>

      <div className="px-5 pt-6">
        <div className="text-[9px] tracking-widest uppercase mb-3" style={{ color: '#a3a3a3' }}>Digital Studio, Est. 2024</div>
        <div style={{ fontFamily: 'Georgia, serif' }}>
          <div className="text-[22px] font-normal leading-tight" style={{ color: '#0a0a0a' }}>We build</div>
          <div className="text-[22px] italic leading-tight" style={{ color: '#0a0a0a' }}>what others can't.</div>
          <svg width="120" height="4" className="mt-0.5"><line x1="0" y1="2" x2="120" y2="2" stroke="#0a0a0a" strokeWidth="1"/></svg>
        </div>

        <div className="flex gap-6 mt-6 pt-4 border-t" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
          {[['48','Projects'],['100%','Retention'],['4yr','Experience']].map(([n,l]) => (
            <div key={l}>
              <div className="text-[14px] font-medium" style={{ fontFamily: 'Georgia, serif', color: '#0a0a0a' }}>{n}</div>
              <div className="text-[7px] tracking-wider uppercase" style={{ color: '#a3a3a3' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute right-4 top-16 opacity-10">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="35" stroke="#0a0a0a" strokeWidth="0.5"/>
          <ellipse cx="40" cy="40" rx="35" ry="12" stroke="#0a0a0a" strokeWidth="0.5"/>
          <line x1="5" y1="40" x2="75" y2="40" stroke="#0a0a0a" strokeWidth="0.5"/>
          <line x1="40" y1="5" x2="40" y2="75" stroke="#0a0a0a" strokeWidth="0.5"/>
        </svg>
      </div>
    </div>
  )
}
