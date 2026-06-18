import { useState, type FormEvent } from 'react'
import type { RSVPSectionData } from '../../types'
import { postToSheet, type SubmitStatus } from '../../lib/sheet'
import SectionWrapper from './SectionWrapper'
import './sections.css'

const ATTEND_YES = "Yes I'll be there"
const ATTEND_NO = "Sorry I can't make it"

export default function RSVPSection({
  heading,
  message,
  rsvpSheetUrl,
  sheetUrl,
  style,
}: RSVPSectionData) {
  const url = rsvpSheetUrl || sheetUrl || ''
  const configured = url.startsWith('http')

  const [name, setName] = useState('')
  const [attending, setAttending] = useState(ATTEND_YES)
  const [guests, setGuests] = useState(1)
  const [note, setNote] = useState('')
  const [status, setStatus] = useState<SubmitStatus>('idle')

  const submitting = status === 'submitting'
  const isAttending = attending === ATTEND_YES

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!configured) return
    setStatus('submitting')
    try {
      // postToSheet appends the timestamp → { name, attending, guests, message, timestamp }
      await postToSheet(url, {
        name,
        attending,
        guests: isAttending ? guests : '',
        message: note,
      })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <SectionWrapper className="section rsvp" id="rsvp" style={style}>
      <div className="section__inner text-center">
        <p className="eyebrow reveal">Be Our Guest</p>
        <h2 className="section-title reveal">{heading ?? 'RSVP'}</h2>
        <div className="divider reveal" />
        <p className="rsvp__message reveal">
          {message ?? 'Kindly let us know if you will be joining us on our special day.'}
        </p>

        {status === 'success' ? (
          <div className="form-success reveal">
            <p className="form-success__title">
              Thank you {name}! We can't wait to celebrate with you
            </p>
          </div>
        ) : (
          <form className="form reveal" onSubmit={handleSubmit}>
            <label className="form__field">
              <span className="form__label">Name</span>
              <input
                className="form__input"
                type="text"
                required
                value={name}
                disabled={submitting}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </label>

            <label className="form__field">
              <span className="form__label">Attending</span>
              <select
                className="form__input"
                value={attending}
                disabled={submitting}
                onChange={(e) => setAttending(e.target.value)}
              >
                <option value={ATTEND_YES}>{ATTEND_YES}</option>
                <option value={ATTEND_NO}>{ATTEND_NO}</option>
              </select>
            </label>

            {isAttending && (
              <label className="form__field">
                <span className="form__label">Number of guests</span>
                <input
                  className="form__input"
                  type="number"
                  min={1}
                  max={20}
                  value={guests}
                  disabled={submitting}
                  onChange={(e) => setGuests(Number(e.target.value))}
                />
              </label>
            )}

            <label className="form__field">
              <span className="form__label">Any message for the couple?</span>
              <textarea
                className="form__input"
                rows={3}
                value={note}
                disabled={submitting}
                onChange={(e) => setNote(e.target.value)}
                placeholder="A note for the couple…"
              />
            </label>

            {status === 'error' && (
              <p className="form-error">
                Something went wrong sending your RSVP. Please try again.
              </p>
            )}

            <button className="btn" type="submit" disabled={!configured || submitting}>
              {submitting ? 'Sending…' : status === 'error' ? 'Retry' : 'Send RSVP'}
            </button>

            {!configured && (
              <p className="form-note">The RSVP form has not been set up yet.</p>
            )}
          </form>
        )}
      </div>
    </SectionWrapper>
  )
}
