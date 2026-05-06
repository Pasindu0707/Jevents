import type { HTMLAttributes, ReactNode } from 'react'

type Variant = 'fade-up' | 'fade-left' | 'scale-in' | 'clip-reveal'

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  variant?: Variant
  as?: 'div' | 'section' | 'article'
  stagger?: boolean
}

export function Reveal({
  children,
  variant = 'fade-up',
  as = 'div',
  stagger = false,
  ...props
}: Props) {
  const Comp = as
  return (
    <Comp
      data-reveal={variant}
      {...(stagger ? { 'data-reveal-stagger': '' } : {})}
      {...props}
    >
      {children}
    </Comp>
  )
}

