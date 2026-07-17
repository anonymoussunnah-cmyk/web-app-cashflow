import { useMemo, useState } from 'react'

function addDays(dateStr, days) {
  if (!dateStr) return ''
  const d = new Date(dateStr + 'T00:00:00')
  if (Number.isNaN(d.getTime())) return ''
  d.setDate(d.getDate() + days)
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

const TERMS = [
  { value: '0', label: 'Due on Receipt' },
  { value: '7', label: 'Net 7' },
  { value: '15', label: 'Net 15' },
  { value: '30', label: 'Net 30' },
  { value: '60', label: 'Net 60' },
]

function generateInvoiceNo() {
  const now = new Date()
  const y = now.getFullYear()
  const rand = Math.floor(100 + Math.random() * 900)
  return `INV-${y}-${rand}`
}

export function InvoiceForm({ onClose, onSave }) {
  const [customer, setCustomer] = useState('')
  const [amount, setAmount] = useState('')
  const [dateSent, setDateSent] = useState('2023-10-24')
  const [terms, setTerms] = useState('30')
  const [status, setStatus] = useState('Unpaid')
  const [submitting, setSubmitting] = useState(false)

  const dueDate = useMemo(
    () => addDays(dateSent, Number(terms)),
    [dateSent, terms],
  )

  const clearForm = () => {
    setCustomer('')
    setAmount('')
    setDateSent('2023-10-24')
    setTerms('30')
    setStatus('Unpaid')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!customer.trim() || !amount) return
    setSubmitting(true)
    try {
      await onSave?.({
        invoice_no: generateInvoiceNo(),
        customer: customer.trim(),
        amount,
        date_sent: dateSent,
        due_date: dueDate,
        status,
      })
      clearForm()
      onClose?.()
    } catch (err) {
      console.error(err)
      alert('Failed to save invoice: ' + (err?.message || err))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      {/* Customer Name */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold font-label text-on-surface">
          Customer Name
        </label>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-on-surface-variant/60">
            person
          </span>
          <input
            type="text"
            placeholder="Enter customer name or select..."
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            className="w-full rounded-xl border border-outline-variant/30 bg-surface-container-low py-2.5 pl-10 pr-4 text-sm font-body text-on-surface placeholder:text-on-surface-variant/50 transition-all focus:border-primary/50 focus:ring-2 focus:ring-primary/30"
          />
        </div>
      </div>

      {/* Amount */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold font-label text-on-surface">
          Invoice Amount (Rp)
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-on-surface-variant/60">
            Rp
          </span>
          <input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-xl border border-outline-variant/30 bg-surface-container-low py-2.5 pl-10 pr-4 text-sm font-body text-on-surface placeholder:text-on-surface-variant/50 transition-all focus:border-primary/50 focus:ring-2 focus:ring-primary/30"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Date Sent */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold font-label text-on-surface">
            Date Sent
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-on-surface-variant/60">
              calendar_today
            </span>
            <input
              type="date"
              value={dateSent}
              onChange={(e) => setDateSent(e.target.value)}
              className="w-full rounded-xl border border-outline-variant/30 bg-surface-container-low py-2.5 pl-10 pr-3 text-sm font-body text-on-surface transition-all focus:border-primary/50 focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>

        {/* Payment Terms */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold font-label text-on-surface">
            Payment Terms
          </label>
          <div className="relative">
            <select
              value={terms}
              onChange={(e) => setTerms(e.target.value)}
              className="w-full cursor-pointer appearance-none rounded-xl border border-outline-variant/30 bg-surface-container-low py-2.5 pl-4 pr-10 text-sm font-body text-on-surface transition-all focus:border-primary/50 focus:ring-2 focus:ring-primary/30"
            >
              {TERMS.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
            <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[18px] text-on-surface-variant">
              arrow_drop_down
            </span>
          </div>
        </div>
      </div>

      {/* Calculated Due Date */}
      <div className="flex items-center justify-between rounded-xl border border-secondary-container bg-secondary-container/30 p-3">
        <span className="text-xs font-semibold uppercase tracking-wider font-body text-on-surface-variant">
          Calculated Due Date
        </span>
        <span className="text-sm font-bold text-tertiary">
          {dueDate || '—'}
        </span>
      </div>

      {/* Initial Status */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold font-label text-on-surface">
          Initial Status
        </label>
        <div className="flex gap-2">
          <label className="flex-1 cursor-pointer">
            <input
              type="radio"
              name="status"
              className="peer sr-only"
              checked={status === 'Unpaid'}
              onChange={() => setStatus('Unpaid')}
            />
            <div className="rounded-lg border border-outline-variant/30 py-2 px-3 text-center text-sm font-body text-on-surface-variant transition-all peer-checked:border-outline peer-checked:bg-surface-variant peer-checked:font-bold">
              Unpaid
            </div>
          </label>
          <label className="flex-1 cursor-pointer">
            <input
              type="radio"
              name="status"
              className="peer sr-only"
              checked={status === 'Paid'}
              onChange={() => setStatus('Paid')}
            />
            <div className="rounded-lg border border-outline-variant/30 py-2 px-3 text-center text-sm font-body text-on-surface-variant transition-all peer-checked:border-primary peer-checked:bg-primary-fixed peer-checked:text-on-primary-fixed-variant peer-checked:font-bold">
              Paid
            </div>
          </label>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 border-t border-outline-variant/20 pt-4">
        <button
          type="button"
          onClick={() => {
            clearForm()
            onClose?.()
          }}
          className="flex-1 rounded-xl bg-surface-container px-4 py-2.5 text-sm font-bold text-on-surface transition-colors hover:bg-surface-container-high"
        >
          Clear
        </button>
          <button
            type="submit"
            disabled={submitting}
            className="flex-[2] rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-on-primary shadow-sm transition-colors hover:bg-primary/90 disabled:opacity-60"
          >
            {submitting ? 'Saving...' : 'Save Invoice'}
          </button>
      </div>
    </form>
  )
}

export default function RecordInvoiceForm({ onSave }) {
  return (
    <div className="sticky top-24 rounded-2xl border border-outline-variant/10 bg-surface-container-lowest p-6 shadow-[0_4px_20px_rgba(46,50,48,0.08)]">
      <div className="mb-6 flex items-center gap-3 border-b border-outline-variant/20 pb-4">
        <div className="rounded-lg bg-primary/10 p-2 text-primary">
          <span className="material-symbols-outlined text-[24px]">post_add</span>
        </div>
        <h3 className="font-headline text-lg font-bold text-on-surface">
          Record Invoice
        </h3>
      </div>

      <InvoiceForm onSave={onSave} />
    </div>
  )
}
