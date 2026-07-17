import { useMemo, useState } from 'react'
import { dueDayMonth, usePurchases } from '../lib/usePurchases'
import { formatCurrency } from '../lib/useInvoices'

const CATEGORIES = [
  'Material (Baja, Aluminium, etc)',
  'Subcon Services',
  'Tools (Pahat Bubut, Endmill)',
]

const PAYMENT_TYPES = [
  { value: '0', label: 'Tunai (Cash)' },
  { value: '7', label: 'Tempo 7 Hari' },
  { value: '14', label: 'Tempo 14 Hari' },
  { value: '30', label: 'Tempo 30 Hari' },
]

const DAILY_ITEMS = [
  'Electricity & Water',
  'Fuel / Transportation',
  'Catering / Meals',
  'Miscellaneous Supplies',
]

function formatDueDate(days) {
  if (days === 0) return 'Today (Immediate)'
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function MainPurchases({ onSave }) {
  const [category, setCategory] = useState(CATEGORIES[0])
  const [supplier, setSupplier] = useState('')
  const [item, setItem] = useState('')
  const [amount, setAmount] = useState('')
  const [paymentType, setPaymentType] = useState('30')
  const [submitting, setSubmitting] = useState(false)

  const days = Number(paymentType)
  const dueDate = useMemo(() => formatDueDate(days), [days])

  const dueDateIso = useMemo(() => {
    if (days === 0) return new Date().toISOString().slice(0, 10)
    const d = new Date()
    d.setDate(d.getDate() + days)
    return d.toISOString().slice(0, 10)
  }, [days])

  const paymentLabel = PAYMENT_TYPES.find((t) => t.value === paymentType)?.label

  const clear = () => {
    setCategory(CATEGORIES[0])
    setSupplier('')
    setItem('')
    setAmount('')
    setPaymentType('30')
  }

  return (
    <section className="rounded-[24px] border border-outline-variant/10 bg-surface-container-lowest p-8 soft-shadow">
      <div className="mb-8 flex items-center gap-3 border-b border-outline-variant/20 pb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-container text-on-primary-container">
          <span className="material-symbols-outlined">inventory_2</span>
        </div>
        <h2 className="font-headline text-2xl font-medium text-on-surface">
          Main Purchases (COGS)
        </h2>
      </div>

      <form
        className="space-y-6"
        onSubmit={async (e) => {
          e.preventDefault()
          if (!supplier.trim() || !amount) return
          setSubmitting(true)
          try {
            await onSave?.({
              category,
              supplier: supplier.trim(),
              item_desc: item.trim(),
              amount,
              payment_type: paymentLabel,
              due_date: dueDateIso,
            })
            clear()
          } catch (err) {
            console.error(err)
            alert('Failed to save purchase: ' + (err?.message || err))
          } finally {
            setSubmitting(false)
          }
        }}
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="font-label text-sm font-semibold text-on-surface-variant">
              Purchase Category
            </label>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full appearance-none rounded-xl border-none bg-surface-container-low px-4 py-3 font-body text-on-surface transition-shadow focus:ring-2 focus:ring-primary/40"
              >
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <span className="material-symbols-outlined pointer-events-none absolute right-4 top-3 text-on-surface-variant">
                expand_more
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-label text-sm font-semibold text-on-surface-variant">
              Supplier / Vendor
            </label>
            <input
              type="text"
              placeholder="e.g. PT Baja Makmur"
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
              className="w-full rounded-xl border-none bg-surface-container-low px-4 py-3 font-body text-on-surface placeholder-on-surface-variant/50 transition-shadow focus:ring-2 focus:ring-primary/40"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="space-y-2 md:col-span-2">
            <label className="font-label text-sm font-semibold text-on-surface-variant">
              Item Description
            </label>
            <input
              type="text"
              placeholder="e.g. 5 Batang Baja ST41"
              value={item}
              onChange={(e) => setItem(e.target.value)}
              className="w-full rounded-xl border-none bg-surface-container-low px-4 py-3 font-body text-on-surface transition-shadow focus:ring-2 focus:ring-primary/40"
            />
          </div>
          <div className="space-y-2">
            <label className="font-label text-sm font-semibold text-on-surface-variant">
              Amount (IDR)
            </label>
            <input
              type="number"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-xl border-none bg-surface-container-low px-4 py-3 text-right font-body text-on-surface transition-shadow focus:ring-2 focus:ring-primary/40"
            />
          </div>
        </div>

        <div className="mt-6 rounded-[16px] border border-secondary-container/50 bg-secondary-container/30 p-6">
          <h3 className="mb-4 flex items-center gap-2 font-headline text-lg font-medium text-on-surface">
            <span className="material-symbols-outlined text-tertiary">
              handshake
            </span>
            Payment Terms
          </h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="font-label text-sm font-semibold text-on-surface-variant">
                Payment Type
              </label>
              <div className="relative">
                <select
                  id="paymentType"
                  value={paymentType}
                  onChange={(e) => setPaymentType(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-outline-variant/30 bg-surface-container-lowest px-4 py-3 font-body text-on-surface transition-shadow focus:ring-2 focus:ring-tertiary/40"
                >
                  {PAYMENT_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
                <span className="material-symbols-outlined pointer-events-none absolute right-4 top-3 text-on-surface-variant">
                  expand_more
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-label text-sm font-semibold text-on-surface-variant">
                Calculated Due Date
              </label>
              <div className="flex cursor-not-allowed items-center justify-between rounded-xl border border-outline-variant/30 bg-surface-container-lowest px-4 py-3 text-on-surface opacity-80">
                <span className="font-body font-medium text-tertiary">
                  {dueDate}
                </span>
                <span className="material-symbols-outlined text-tertiary">
                  calendar_today
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center gap-2 rounded-xl bg-primary px-8 py-3 font-body font-semibold text-on-primary soft-shadow transition-all duration-200 hover:bg-surface-tint disabled:opacity-60"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              save
            </span>
            {submitting ? 'Saving...' : 'Record Purchase'}
          </button>
        </div>
      </form>
    </section>
  )
}

function DailyCash() {
  const [item, setItem] = useState(DAILY_ITEMS[0])
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')

  return (
    <section className="rounded-[24px] border border-outline-variant/10 bg-surface-container-lowest p-6 soft-shadow">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-headline text-xl font-medium text-on-surface">
          <span className="material-symbols-outlined text-primary">
            local_cafe
          </span>
          Daily Cash
        </h2>
      </div>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault()
          setAmount('')
          setNote('')
        }}
      >
        <div className="relative">
          <select
            value={item}
            onChange={(e) => setItem(e.target.value)}
            className="w-full appearance-none rounded-xl border-none bg-surface-container-low px-4 py-3 text-sm font-body text-on-surface focus:ring-2 focus:ring-primary/40"
          >
            {DAILY_ITEMS.map((i) => (
              <option key={i}>{i}</option>
            ))}
          </select>
          <span className="material-symbols-outlined pointer-events-none absolute right-3 top-3 text-sm text-on-surface-variant">
            expand_more
          </span>
        </div>
        <input
          type="number"
          placeholder="Amount (IDR)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full rounded-xl border-none bg-surface-container-low px-4 py-3 text-right text-sm font-body text-on-surface focus:ring-2 focus:ring-primary/40"
        />
        <input
          type="text"
          placeholder="Short note..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full rounded-xl border-none bg-surface-container-low px-4 py-3 text-sm font-body text-on-surface focus:ring-2 focus:ring-primary/40"
        />
        <button
          type="submit"
          className="w-full rounded-xl border border-primary/20 bg-surface-container-high py-3 font-body font-semibold text-primary transition-colors hover:bg-primary-container/20"
        >
          Add Expense
        </button>
      </form>
    </section>
  )
}

function UpcomingDues({ purchases, loading }) {
  return (
    <section className="relative overflow-hidden rounded-[24px] border border-outline-variant/10 bg-surface-container-low p-6 soft-shadow">
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-tertiary-container/10 blur-3xl" />
      <div className="relative z-10 mb-6 flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-headline text-xl font-medium text-on-surface">
          <span className="material-symbols-outlined text-tertiary">
            event_upcoming
          </span>
          Upcoming Dues
        </h2>
        <button className="text-sm font-label text-primary hover:underline">
          View All
        </button>
      </div>

      <div className="relative z-10 space-y-4">
        {loading ? (
          <p className="font-body text-sm text-on-surface-variant">
            Loading dues...
          </p>
        ) : purchases.length === 0 ? (
          <p className="font-body text-sm text-on-surface-variant">
            No upcoming dues.
          </p>
        ) : (
          purchases.map((p) => {
            const { day, month } = dueDayMonth(p.due_date)
            const isOverdue =
              new Date(p.due_date + 'T00:00:00') < new Date() &&
              p.status !== 'Paid'
            return (
              <div
                key={p.id}
                className={
                  'flex items-start gap-4 rounded-xl border bg-surface-container-lowest p-4 transition-shadow hover:shadow-md ' +
                  (isOverdue
                    ? 'border-error-container/50'
                    : 'border-outline-variant/20')
                }
              >
                <div
                  className={
                    'flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg ' +
                    (isOverdue
                      ? 'bg-error-container/30 text-on-error-container'
                      : 'bg-tertiary-container/20 text-on-tertiary-container')
                  }
                >
                  <span className="font-headline text-lg font-bold leading-none">
                    {day}
                  </span>
                  <span className="font-label text-xs">{month}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-body font-bold text-on-surface">
                    {p.supplier}
                  </p>
                  <p className="truncate font-body text-xs text-on-surface-variant">
                    {p.item_desc || p.category}
                  </p>
                  <p
                    className={
                      'mt-1 font-body text-sm font-medium ' +
                      (isOverdue ? 'text-error' : 'text-on-surface')
                    }
                  >
                    {formatCurrency(p.amount)}
                  </p>
                </div>
              </div>
            )
          })
        )}
      </div>
    </section>
  )
}

export default function Expenditure() {
  const { purchases, loading, addPurchase } = usePurchases()

  return (
    <main className="flex-1 p-6 md:p-10">
      <header className="mb-10">
        <h1 className="mb-2 font-headline text-3xl font-semibold text-primary md:text-4xl">
          Manajemen Pengeluaran
        </h1>
        <p className="font-body text-lg text-on-surface-variant">
          Record raw materials, tools, and track supplier debt seamlessly.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <MainPurchases onSave={addPurchase} />
        </section>

        <div className="space-y-8">
          <DailyCash />
          <UpcomingDues purchases={purchases} loading={loading} />
        </div>
      </div>
    </main>
  )
}
