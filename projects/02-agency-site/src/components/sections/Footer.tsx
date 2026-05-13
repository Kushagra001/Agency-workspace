export function Footer() {
  return (
    <footer className="py-12 px-8 md:px-16 border-t border-stone">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between text-[12px]">
          <p className="font-display text-[14px] text-ink">Arca Studio</p>
          <div className="flex items-center gap-6 text-dim">
            <a href="#work" data-magnetic className="hover:text-ink transition-colors">Work</a>
            <a href="#about" data-magnetic className="hover:text-ink transition-colors">About</a>
            <a href="#services" data-magnetic className="hover:text-ink transition-colors">Services</a>
          </div>
        </div>

        <div className="flex items-center justify-between text-[12px] text-dim">
          <p>© 2025 Arca Studio</p>
          <div className="flex items-center gap-6">
            <a href="#" data-magnetic className="hover:text-ink transition-colors">Twitter</a>
            <a href="#" data-magnetic className="hover:text-ink transition-colors">LinkedIn</a>
            <a href="#" data-magnetic className="hover:text-ink transition-colors">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
