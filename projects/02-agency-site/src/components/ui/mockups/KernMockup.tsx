export function KernMockup() {
  return (
    <div className="w-full relative overflow-hidden" style={{ backgroundColor: '#1c1408', height: '100%', minHeight: 280 }}>
      <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        <span className="text-[12px] tracking-widest uppercase" style={{ color: '#f5f0e8', letterSpacing: '0.2em' }}>KERN</span>
        <div className="flex gap-4">
          {['Shop','Collections','About'].map(l => (
            <span key={l} className="text-[9px]" style={{ color: 'rgba(255,255,255,0.4)' }}>{l}</span>
          ))}
        </div>
        <div className="text-[9px]" style={{ color: 'rgba(255,255,255,0.4)' }}>Cart (0)</div>
      </div>

      <div className="px-5 pt-5">
        <div className="text-[9px] tracking-widest uppercase mb-3" style={{ color: 'rgba(255,255,255,0.3)' }}>New Collection · AW 2025</div>
        <div className="text-[20px] font-light leading-tight mb-1" style={{ color: '#f5f0e8', letterSpacing: '-0.02em' }}>Crafted for<br/>the considered.</div>
        <div className="text-[8px] mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>Limited-run garments. Ethically made. Built to last decades.</div>

        <div className="flex gap-2">
          {[{ name: 'Overshirt', price: '₹8,400', tag: 'New' },{ name: 'Trousers', price: '₹6,200', tag: '' }].map((p, i) => (
            <div key={i} className="flex-1 rounded overflow-hidden border" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              <div className="w-full aspect-square flex items-center justify-center" style={{ background: i === 0 ? '#2d1f0a' : '#231a08' }}>
                <span className="text-[24px] font-light" style={{ color: 'rgba(245,240,232,0.08)' }}>K</span>
              </div>
              <div className="p-2">
                <div className="flex items-center justify-between">
                  <span className="text-[8px]" style={{ color: '#f5f0e8' }}>{p.name}</span>
                  {p.tag && (<span className="text-[6px] px-1 rounded" style={{ background: '#8B5E3C', color: '#f5f0e8' }}>{p.tag}</span>)}
                </div>
                <div className="text-[8px] mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{p.price}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 border py-2 text-center text-[8px] tracking-widest uppercase" style={{ borderColor: 'rgba(255,255,255,0.2)', color: '#f5f0e8' }}>Shop the collection →</div>
      </div>
    </div>
  )
}
