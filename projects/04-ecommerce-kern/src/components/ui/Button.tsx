"use client";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "ghost" | "filled";
  size?: "sm" | "md";
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export function Button({
  children,
  href,
  onClick,
  variant = "ghost",
  size = "md",
  className = "",
  disabled = false,
  type = "button",
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center tracking-widest uppercase transition-all duration-200 font-sans font-normal";

  const sizeStyles = {
    sm: "text-[10px] px-4 py-2.5",
    md: "text-xs px-6 py-3.5",
  };

  const variantStyles = {
    ghost:
      "border border-kern-border-strong text-kern-cream-dim hover:border-kern-cream/40 hover:text-kern-cream",
    filled:
      "bg-kern-cream text-kern-black hover:bg-kern-cream-hover disabled:opacity-40",
  };

  const allStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={allStyles}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={allStyles}
    >
      {children}
    </button>
  );
}
