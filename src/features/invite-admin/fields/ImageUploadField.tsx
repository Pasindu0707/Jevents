import { FieldLabel } from '@measured/puck'
import { openUploadWidget } from '../lib/cloudinary'
import './admin-fields.css'

interface Props {
  label: string
  value?: string
  onChange: (value: string) => void
}

/** Puck custom field: image preview + Cloudinary upload + manual URL fallback. */
export default function ImageUploadField({ label, value, onChange }: Props) {
  const url = value ?? ''

  return (
    <FieldLabel label={label}>
      <div className="iuf">
        {url ? (
          <div className="iuf__preview">
            <img className="iuf__thumb" src={url} alt="" />
            <button type="button" className="iuf__link" onClick={() => onChange('')}>
              Remove
            </button>
          </div>
        ) : (
          <div className="iuf__placeholder">No image selected</div>
        )}

        <button
          type="button"
          className="iuf__upload"
          onClick={() => openUploadWidget((u) => onChange(u))}
        >
          Upload Photo
        </button>

        <input
          className="iuf__input"
          type="text"
          placeholder="…or paste an image URL"
          value={url}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </FieldLabel>
  )
}
