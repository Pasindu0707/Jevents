type Props = {
  className?: string
  label?: string
  path: '/images/photo.png' | '/videos/video.mp4' | (string & {})
}

export function MediaPlaceholder({ className = '', label = 'Media', path }: Props) {
  return (
    <div
      data-path={path}
      className={[
        'relative overflow-hidden rounded-3xl',
        'bg-black',
        'shadow-(--shadow-elev)',
        'ring-1 ring-[rgb(var(--border))]',
        className,
      ].join(' ')}
    >
      <div className="absolute inset-0 opacity-[0.08] [background:radial-gradient(circle_at_30%_10%,rgba(255,255,255,0.25),transparent_42%),radial-gradient(circle_at_70%_90%,rgba(255,255,255,0.18),transparent_45%)]" />
      <div className="absolute left-5 top-5 text-[11px] font-semibold tracking-[0.22em] text-white/70 uppercase">
        {label}
      </div>
      <div className="absolute bottom-5 left-5 text-[11px] tracking-wide text-white/55">
        {path}
      </div>
      <div className="aspect-16/10" />
    </div>
  )
}

