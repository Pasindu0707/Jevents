import { useState, type FormEvent } from 'react'
import type { InquirySectionData } from '../../types'
import { postToSheet, type SubmitStatus } from '../../lib/sheet'
import SectionWrapper from './SectionWrapper'
import './sections.css'

export default function InquirySection({
  heading,
  message,
  inquirySheetUrl,
  style,
}: InquirySectionData) {
  const url = inquirySheetUrl || ''
  const configured = url.startsWith('http')

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    weddingDate: '',
    message: '',
  })
  const [status, setStatus] = useState<SubmitStatus>('idle')

  const submitting = status === 'submitting'
  const update = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((f) => ({ ...f, [key]: e.target.value }))

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!configured) return
    setStatus('submitting')
    try {
      await postToSheet(url, { ...form })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <SectionWrapper className="section inquiry" id="inquiry" style={style}>
      <div className="section__inner text-center">
        <p className="eyebrow reveal">Get In Touch</p>
        <h2 className="section-title reveal">{heading ?? 'Inquiries'}</h2>
        <div className="divider reveal" />
        <p className="rsvp__message reveal">
          {message ?? 'Have a question? Send us a note and we’ll get back to you.'}
        </p>

        {status === 'success' ? (
          <div className="form-success reveal">
            <p className="form-success__title">
              Thank you {form.name}! We’ve received your message and will be in touch soon.
            </p>
          </div>
        ) : (
          <form className="form reveal" onSubmit={handleSubmit}>
            <div className="form__row">
              <label className="form__field">
                <span className="form__label">Name</span>
                <input
                  className="form__input"
                  type="text"
                  required
                  value={form.name}
                  disabled={submitting}
                  onChange={update('name')}
                  placeholder="Your name"
                />
              </label>
              <label className="form__field">
                <span className="form__label">Email</span>
                <input
                  className="form__input"
                  type="email"
                  required
                  value={form.email}
                  disabled={submitting}
                  onChange={update('email')}
                  placeholder="you@example.com"
                />
              </label>
            </div>

            <div className="form__row">
              <label className="form__field">
                <span className="form__label">Phone</span>
                <input
                  className="form__input"
                  type="tel"
                  value={form.phone}
                  disabled={submitting}
                  onChange={update('phone')}
                  placeholder="+94 ..."
                />
              </label>
              <label className="form__field">
                <span className="form__label">Wedding Date</span>
                <input
                  className="form__input"
                  type="date"
                  value={form.weddingDate}
                  disabled={submitting}
                  onChange={update('weddingDate')}
                />
              </label>
            </div>

            <label className="form__field">
              <span className="form__label">Message</span>
              <textarea
                className="form__input"
                rows={3}
                required
                value={form.message}
                disabled={submitting}
                onChange={update('message')}
                placeholder="How can we help?"
              />
            </label>

            {status === 'error' && (
              <p className="form-error">
                Something went wrong sending your message. Please try again.
              </p>
            )}

            <button className="btn" type="submit" disabled={!configured || submitting}>
              {submitting ? 'Sending…' : status === 'error' ? 'Retry' : 'Send Message'}
            </button>

            {!configured && (
              <p className="form-note">The inquiry form has not been set up yet.</p>
            )}
          </form>
        )}
      </div>
    </SectionWrapper>
  )
}
