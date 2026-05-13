export function MedicaMockup() {
  return (
    <div className="w-full relative overflow-hidden" style={{ backgroundColor: '#f8fafc', height: '100%', minHeight: 280 }}>
      <div className="flex items-center justify-between px-5 py-3 border-b bg-white" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm" style={{ background: '#2980b9' }} />
          <span className="text-[11px] font-medium" style={{ color: '#0f172a' }}>Medica</span>
        </div>
        <div className="flex gap-4">
          {['Services','Doctors','Book'].map(l => (
            <span key={l} className="text-[9px]" style={{ color: '#64748b' }}>{l}</span>
          ))}
        </div>
        <div className="rounded px-2 py-0.5 text-[9px] text-white" style={{ background: '#2980b9' }}>Book now</div>
      </div>

      <div className="px-5 pt-4">
        <div className="text-[9px] tracking-widest uppercase mb-2" style={{ color: '#2980b9' }}>Trusted Healthcare</div>
        <div className="text-[16px] font-semibold leading-tight mb-1" style={{ color: '#0f172a' }}>Quality care,<br/>when you need it.</div>
        <div className="text-[8px] mb-3" style={{ color: '#64748b' }}>Book appointments, access records, and connect with specialists.</div>

        <div className="bg-white rounded-lg p-3 border" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
          <div className="text-[9px] font-medium mb-2" style={{ color: '#0f172a' }}>Book an appointment</div>
          {['Select department','Preferred date','Your name'].map((ph, i) => (
            <div key={i} className="rounded border px-2 py-1.5 mb-1.5 text-[8px]" style={{ borderColor: '#e2e8f0', color: '#94a3b8' }}>{ph}</div>
          ))}
          <div className="rounded py-1.5 text-center text-[8px] text-white mt-2" style={{ background: '#2980b9' }}>Confirm booking</div>
        </div>

        <div className="flex gap-3 mt-3">
          {[['2,400+','Patients'],['15','Doctors'],['4.9★','Rating']].map(([n,l]) => (
            <div key={l} className="flex-1 bg-white rounded p-2 border text-center" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
              <div className="text-[11px] font-semibold" style={{ color: '#0f172a' }}>{n}</div>
              <div className="text-[7px]" style={{ color: '#94a3b8' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
