import { useMemo, useState } from 'react'
import { isSupabaseConfigured, supabase } from '../lib/supabase'

function parseIdr(value) {
  const n = Number(String(value).replace(/[^0-9.-]/g, ''))
  return Number.isFinite(n) ? n : 0
}

function formatIdr(value) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value)
}

function inRange(dateStr, start, end) {
  if (!dateStr) return false
  return dateStr >= start && dateStr <= end
}

const SEED_INFLOW = 45000000 // invoices expected to be collected in range
const SEED_OUTFLOW = 5750000 // purchases expected to be paid in range

export default function PredictionCalculator() {
  const [balance, setBalance] = useState('Rp 125.000.000')
  const [startDate, setStartDate] = useState('2023-11-01')
  const [endDate, setEndDate] = useState('2023-11-30')
  const [calculated, setCalculated] = useState(true)
  const [loading, setLoading] = useState(false)
  const [summary, setSummary] = useState({
    inflow: 45000000,
    outflow: 5750000,
  })

  const start = parseIdr(balance)

  // Initial display uses a simple estimate; recomputed on button click.
  const projected = useMemo(() => {
    return Math.round(start + summary.inflow - summary.outflow)
  }, [start, summary])

  const pct =
    start > 0 ? Math.round(((projected - start) / start) * 100) : 0
  const trendUp = pct >= 0

  const handleCalculate = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      let inflow = 0
      let outflow = 0
      if (isSupabaseConfigured) {
        const [{ data: inv }, { data: pur }] = await Promise.all([
          supabase
            .from('invoices')
            .select('amount, due_date, status')
            .neq('status', 'Overdue'),
          supabase.from('purchases').select('amount, due_date, status'),
        ])
        inv?.forEach((r) => {
          if (inRange(r.due_date, startDate, endDate) && r.status !== 'Paid')
            inflow += Number(r.amount) || 0
        })
        pur?.forEach((r) => {
          if (inRange(r.due_date, startDate, endDate) && r.status !== 'Paid')
            outflow += Number(r.amount) || 0
        })
      } else {
        inflow = SEED_INFLOW
        outflow = SEED_OUTFLOW
      }
      setSummary({ inflow, outflow })
      setCalculated(true)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col rounded-xl border border-surface-variant/50 bg-surface p-8 soft-shadow lg:col-span-5">
      <h3 className="mb-6 flex items-center gap-2 font-headline text-2xl text-on-surface">
        <span className="material-symbols-outlined text-primary">calculate</span>
        Prediction Calculator
      </h3>

      <form className="flex flex-1 flex-col space-y-6" onSubmit={handleCalculate}>
        <div>
          <label className="mb-2 block text-sm font-semibold font-body text-on-surface-variant">
            Saldo Awal Bank/Kas (IDR)
          </label>
          <input
            type="text"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            className="w-full rounded-lg border border-outline-variant/50 bg-surface-bright px-4 py-3 font-body text-on-surface transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block text-sm font-semibold font-body text-on-surface-variant">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full rounded-lg border border-outline-variant/50 bg-surface-bright px-4 py-3 text-sm font-body text-on-surface transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold font-body text-on-surface-variant">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full rounded-lg border border-outline-variant/50 bg-surface-bright px-4 py-3 text-sm font-body text-on-surface transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
        </div>

        <div className="mt-6 border-t border-outline-variant/30 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="mb-6 flex w-full items-center justify-center gap-2 rounded-xl bg-secondary-container px-4 py-3 font-body font-semibold text-on-secondary-container transition-colors hover:bg-tertiary-fixed disabled:opacity-60"
          >
            <span className="material-symbols-outlined text-sm">update</span>
            {loading ? 'Calculating...' : 'Calculate Projection'}
          </button>

          <div className="rounded-xl border border-primary-fixed bg-primary-fixed/30 p-6 text-center">
            <p className="mb-1 text-sm font-body text-on-surface-variant">
              Proyeksi Saldo Akhir
            </p>
            <p className="font-headline text-3xl font-bold text-primary">
              {formatIdr(projected)}
            </p>
            <p
              className={
                'mt-2 flex items-center justify-center gap-1 text-xs font-body ' +
                (trendUp ? 'text-primary' : 'text-error')
              }
            >
              <span className="material-symbols-outlined text-[16px]">
                {trendUp ? 'trending_up' : 'trending_down'}
              </span>
              {pct > 0 ? '+' : ''}
              {pct}% from start balance
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}
