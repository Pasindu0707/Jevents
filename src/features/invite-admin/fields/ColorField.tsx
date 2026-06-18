import { FieldLabel } from '@measured/puck'
import './admin-fields.css'

interface Props {
  label: string
  value?: string
  onChange: (value: string) => void
  defaultValue?: string
}

/** Puck custom field: native color swatch + editable hex text input. */
export default function ColorField({ label, value, onChange, defaultValue = '#ffffff' }: Props) {
  const v = value || defaultValue
  const swatch = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(v) ? v : '#ffffff'

  return (
    <FieldLabel label={label}>
      <div className="cf">
        <input
          type="color"
          className="cf__swatch"
          value={swatch}
          onChange={(e) => onChange(e.target.value)}
        />
        <input
          type="text"
          className="cf__hex"
          value={v}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
        />
      </div>
    </FieldLabel>
  )
}
