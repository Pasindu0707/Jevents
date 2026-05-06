import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: ReactNode
  label: string
}

export function IconButton({ icon, label, className = '', ...props }: Props) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={[
        'inline-flex h-10 w-10 items-center justify-center rounded-full',
        'border border-[rgb(var(--border))] bg-[rgb(var(--card))] text-[rgb(var(--fg))]',
        'shadow-(--shadow-soft)',
        'hover:shadow-(--shadow-elev)',
        'focus-visible:outline-none',
        className,
      ].join(' ')}
      {...props}
    >
      {icon}
    </button>
  )
}

