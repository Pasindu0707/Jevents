import { FieldLabel } from '@measured/puck'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { openUploadWidget } from '../lib/cloudinary'
import './admin-fields.css'

export interface GalleryItem {
  id: string
  url: string
}

interface Props {
  label: string
  value?: GalleryItem[]
  onChange: (value: GalleryItem[]) => void
}

export function galleryUid(): string {
  return `img-${Math.random().toString(36).slice(2, 10)}`
}

function SortableThumb({ item, onRemove }: { item: GalleryItem; onRemove: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: item.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 2 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} className="guf__item">
      <button
        type="button"
        className="guf__handle"
        aria-label="Drag to reorder"
        {...attributes}
        {...listeners}
      >
        ⠿
      </button>
      {item.url ? (
        <img className="guf__thumb" src={item.url} alt="" />
      ) : (
        <div className="guf__empty">empty</div>
      )}
      <button
        type="button"
        className="guf__remove"
        aria-label="Remove image"
        onClick={onRemove}
      >
        ×
      </button>
    </div>
  )
}

/** Puck custom field: drag-to-reorder gallery with Cloudinary upload + remove. */
export default function GalleryUploadField({ label, value, onChange }: Props) {
  const items = value ?? []
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = items.findIndex((i) => i.id === active.id)
    const newIndex = items.findIndex((i) => i.id === over.id)
    if (oldIndex !== -1 && newIndex !== -1) {
      onChange(arrayMove(items, oldIndex, newIndex))
    }
  }

  function handleAdd() {
    // Track appends locally so multiple uploads in one widget session all land.
    let current = [...items]
    openUploadWidget(
      (url) => {
        current = [...current, { id: galleryUid(), url }]
        onChange(current)
      },
      { multiple: true },
    )
  }

  return (
    <FieldLabel label={label}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items.map((i) => i.id)} strategy={rectSortingStrategy}>
          <div className="guf__grid">
            {items.map((item, idx) => (
              <SortableThumb
                key={item.id}
                item={item}
                onRemove={() => onChange(items.filter((_, i) => i !== idx))}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <button type="button" className="guf__add" onClick={handleAdd}>
        + Add Photo
      </button>
    </FieldLabel>
  )
}
