import { useEffect, useState } from 'react'

const TERMS = ['Cash', 'Net 7', 'Net 15', 'Net 30', 'Net 60']

export default function AddPartnerModal({ open, onClose, onSave }) {
  const [name, setName] = useState('')
  const [type, setType] = useState('Customer')
  const [contact, setContact] = useState('')
  const [terms, setTerms] = useState('Net 30')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  useEffect(() => {
    if (open) {
      setName('')
      setType('Customer')
      setContact('')
      setTerms('Net 30')
    }
  }, [open])

  if (!open) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim()) return
    setSaving(true)
    try {
      await onSave?.({ name, type, contact, terms })
      onClose()
    } catch (err) {
      console.error(err)
      alert('Failed to save partner: ' + (err?.message || err))
    } finally {
      setSaving(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/40 p-4 backdrop-blur-sm"
      onMouseDown={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-6 shadow-[0_4px_20px_rgba(46,50,48,0.12)]"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between border-b border-outline-variant/20 pb-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2 text-primary">
              <span className="material-symbols-outlined text-[24px]">
                person_add
              </span>
            </div>
            <h3 className="font-headline text-lg font-bold text-on-surface">
              Add Partner
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary"
            aria-label="Close"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold font-label text-on-surface">
              Partner Name
            </label>
            <input
              type="text"
              placeholder="e.g. PT Baja Makmur"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-outline-variant/30 bg-surface-container-low px-4 py-2.5 text-sm font-body text-on-surface placeholder:text-on-surface-variant/50 transition-all focus:border-primary/50 focus:ring-2 focus:ring-primary/30"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold font-label text-on-surface">
              Type
            </label>
            <div className="relative">
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full cursor-pointer appearance-none rounded-xl border border-outline-variant/30 bg-surface-container-low px-4 py-2.5 pr-10 text-sm font-body text-on-surface transition-all focus:border-primary/50 focus:ring-2 focus:ring-primary/30"
              >
                <option>Customer</option>
                <option>Supplier</option>
              </select>
              <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[18px] text-on-surface-variant">
                arrow_drop_down
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold font-label text-on-surface">
              Contact
            </label>
            <input
              type="text"
              placeholder="e.g. Budi (0812...)"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full rounded-xl border border-outline-variant/30 bg-surface-container-low px-4 py-2.5 text-sm font-body text-on-surface placeholder:text-on-surface-variant/50 transition-all focus:border-primary/50 focus:ring-2 focus:ring-primary/30"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold font-label text-on-surface">
              Payment Terms
            </label>
            <div className="relative">
              <select
                value={terms}
                onChange={(e) => setTerms(e.target.value)}
                className="w-full cursor-pointer appearance-none rounded-xl border border-outline-variant/30 bg-surface-container-low px-4 py-2.5 pr-10 text-sm font-body text-on-surface transition-all focus:border-primary/50 focus:ring-2 focus:ring-primary/30"
              >
                {TERMS.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
              <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[18px] text-on-surface-variant">
                arrow_drop_down
              </span>
            </div>
          </div>

          <div className="flex gap-3 border-t border-outline-variant/20 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl bg-surface-container px-4 py-2.5 text-sm font-bold text-on-surface transition-colors hover:bg-surface-container-high"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-[2] rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-on-primary shadow-sm transition-colors hover:bg-primary/90 disabled:opacity-60"
            >
              {saving ? 'Saving...' : 'Save Partner'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
