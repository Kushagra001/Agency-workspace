export function FlowMockup() {
  return (
    <div className="w-full relative overflow-hidden" style={{ backgroundColor: '#f7f3ee', height: '100%', minHeight: 280 }}>
      <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 rounded-full" style={{ background: '#c0392b' }} />
          <span className="text-[11px] font-medium" style={{ color: '#1a1612' }}>Flōw</span>
        </div>
        <div className="flex gap-4">
          {['Features','Pricing','Changelog'].map(l => (
            <span key={l} className="text-[9px]" style={{ color: '#6b6560' }}>{l}</span>
          ))}
        </div>
        <div className="rounded px-2 py-0.5 text-[9px] text-white" style={{ background: '#c0392b' }}>Get access</div>
      </div>

      <div className="px-5 pt-5 pb-3">
        <div className="text-[15px] font-semibold leading-tight mb-0.5" style={{ color: '#1a1612' }}>Your second brain,</div>
        <div className="text-[15px] font-semibold leading-tight italic" style={{ color: '#c0392b' }}>actually works.</div>
        <div className="text-[8px] mt-2 leading-relaxed" style={{ color: '#6b6560', maxWidth: 160 }}>Flōw turns chaos into clean, prioritised tasks automatically.</div>
        <div className="flex gap-2 mt-3">
          <div className="rounded px-3 py-1 text-[8px] text-white" style={{ background: '#c0392b' }}>Start free</div>
          <div className="rounded px-3 py-1 text-[8px] border" style={{ borderColor: 'rgba(0,0,0,0.15)', color: '#1a1612' }}>See how →</div>
        </div>
      </div>

      <div className="mx-5 rounded-lg overflow-hidden border" style={{ borderColor: 'rgba(0,0,0,0.08)', background: '#ffffff' }}>
        <div className="flex items-center justify-between px-3 py-2 border-b" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
          <span className="text-[9px] font-medium" style={{ color: '#1a1612' }}>Flōw — Today's tasks</span>
          <div className="rounded-full px-2 py-0.5 text-[7px]" style={{ background: '#fde8e6', color: '#c0392b' }}>● Processing...</div>
        </div>
        {[{ done: true, text: 'Research competitor pricing models' },{ done: false, text: 'Write launch email for beta users' },{ done: false, text: 'Schedule onboarding call' }].map((task, i) => (
          <div key={i} className="flex items-center gap-2 px-3 py-1.5 border-b last:border-0" style={{ borderColor: 'rgba(0,0,0,0.04)' }}>
            <div className="w-3 h-3 rounded flex-shrink-0 flex items-center justify-center" style={{ border: task.done ? 'none' : '1px solid #d1d5db', background: task.done ? '#c0392b' : 'transparent' }}>{task.done && (
              <svg width="7" height="7" viewBox="0 0 7 7" fill="none"><path d="M1 3.5l2 2 3-3" stroke="white" strokeWidth="1" strokeLinecap="round"/></svg>
            )}</div>
            <span className="text-[8px]" style={{ color: task.done ? '#a3a3a3' : '#1a1612', textDecoration: task.done ? 'line-through' : 'none' }}>{task.text}</span>
            <div className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: i === 0 ? '#d1d5db' : '#c0392b' }} />
          </div>
        ))}
      </div>
    </div>
  )
}
