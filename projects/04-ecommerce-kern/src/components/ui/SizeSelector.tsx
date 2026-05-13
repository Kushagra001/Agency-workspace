"use client";

interface SizeSelectorProps {
  sizes: string[];
  selected: string;
  onSelect: (size: string) => void;
}

export function SizeSelector({ sizes, selected, onSelect }: SizeSelectorProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {sizes.map((size) => (
        <button
          key={size}
          onClick={() => onSelect(size)}
          className={[
            "w-11 h-11 text-xs font-normal border transition-all duration-150 font-sans",
            selected === size
              ? "border-kern-cream bg-kern-cream text-kern-black"
              : "border-kern-border text-kern-cream-faint hover:border-kern-border-strong hover:text-kern-cream-dim",
          ].join(" ")}
          aria-pressed={selected === size}
          aria-label={`Size ${size}`}
        >
          {size}
        </button>
      ))}
    </div>
  );
}
