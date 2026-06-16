import { assetUrl } from '@/lib/media'
import type { GalleryImage } from '@/types/couple'

interface Props {
  images: GalleryImage[]
  className?: string
}

/**
 * Reusable photo gallery — a responsive, mobile-first grid driven entirely by a
 * couple's `gallery` data. Renders nothing when there are no images, so the
 * surrounding section disappears with it.
 *
 * No upload and no lightbox yet (later steps); this just displays the images
 * with their alt text and an optional caption.
 */
export function Gallery({ images, className = '' }: Props) {
  if (!images || images.length === 0) return null

  return (
    <ul
      className={
        'mx-auto grid max-w-4xl grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 ' +
        className
      }
    >
      {images.map((img, i) => (
        <li key={i} className="group relative overflow-hidden rounded-xl">
          <img
            src={assetUrl(img.src)}
            alt={img.alt ?? ''}
            loading="lazy"
            className="aspect-square w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          {img.caption && (
            <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/55 to-transparent p-2 text-left text-xs text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {img.caption}
            </figcaption>
          )}
        </li>
      ))}
    </ul>
  )
}
