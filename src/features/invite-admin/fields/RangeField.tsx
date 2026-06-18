import { FieldLabel } from '@measured/puck'
import './admin-fields.css'

interface Props {
  label: string
  value?: number
  onChange: (value: number) => void
  min: number
  max: number
  step?: number
  suffix?: string
  defaultValue?: number
}

/** Puck custom field: a labelled range slider with a live value readout. */
export default function RangeField({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  suffix = '',
  defaultValue,
}: Props) {
  const v = typeof value === 'number' ? value : defaultValue ?? min

  return (
    <FieldLabel label={label}>
      <div className="rf">
        <input
          type="range"
          className="rf__range"
          min={min}
          max={max}
          step={step}
          value={v}
          onChange={(e) => onChange(parseFloat(e.target.value))}
        />
        <span className="rf__value">
          {v}
          {suffix}
        </span>
      </div>
    </FieldLabel>
  )
}
