type Props = {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
}: Props) {
  const centered = align === 'center'

  return (
    <div
      className={[
        'flex flex-col gap-4',
        centered ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between',
      ].join(' ')}
    >
      <div className={centered ? 'max-w-3xl' : ''}>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-3 font-display text-[length:var(--text-h2)] leading-tight tracking-[-0.02em]">
          {title}
        </h2>
      </div>
      {description ? (
        <p
          className={[
            'max-w-xl text-[length:var(--text-small)] leading-relaxed text-[rgb(var(--muted-fg))]',
            centered ? 'mx-auto' : '',
          ].join(' ')}
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}
