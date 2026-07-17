import { useCallback, useEffect, useState } from 'react'
import { isSupabaseConfigured, supabase } from '../lib/supabase'

const SEED = [
  {
    invoice_no: 'INV-2023-089',
    customer: 'PT. Sumber Teknik',
    amount: 3500000,
    date_sent: '2023-09-15',
    due_date: '2023-10-15',
    status: 'Overdue',
  },
  {
    invoice_no: 'INV-2023-092',
    customer: 'CV. Maju Bersama',
    amount: 12000000,
    date_sent: '2023-10-02',
    due_date: '2023-11-01',
    status: 'Unpaid',
  },
  {
    invoice_no: 'INV-2023-094',
    customer: 'Bintang Makmur',
    amount: 25000000,
    date_sent: '2023-10-10',
    due_date: '2023-11-09',
    status: 'Partial',
  },
  {
    invoice_no: 'INV-2023-085',
    customer: 'Karya Sentosa Mulia',
    amount: 8200000,
    date_sent: '2023-09-05',
    due_date: '2023-10-05',
    status: 'Paid',
  },
]

function deriveStatus(record) {
  if (record.status === 'Paid' || record.status === 'Partial') {
    return record.status
  }
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const due = new Date(record.due_date + 'T00:00:00')
  return due < today ? 'Overdue' : 'Unpaid'
}

export function useInvoices() {
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setInvoices(SEED.map((r) => ({ ...r, id: r.invoice_no })))
      setLoading(false)
      return
    }
    try {
      const { data, error: err } = await supabase
        .from('invoices')
        .select('*')
        .order('date_sent', { ascending: false })
      if (err) throw err
      setInvoices(data.map((r) => ({ ...r, status: deriveStatus(r) })))
    } catch (e) {
      setError(e)
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [])

  const addInvoice = useCallback(
    async ({ invoice_no, customer, amount, date_sent, due_date, status }) => {
      const row = {
        invoice_no,
        customer,
        amount: Number(amount),
        date_sent,
        due_date,
        status,
      }
      if (!isSupabaseConfigured) {
        setInvoices((prev) => [
          { ...row, id: invoice_no },
          ...prev,
        ])
        return
      }
      const { error: err } = await supabase.from('invoices').insert(row)
      if (err) throw err
      await load()
    },
    [load],
  )

  useEffect(() => {
    load()
  }, [load])

  return { invoices, loading, error, addInvoice, reload: load }
}

export function formatCurrency(value) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(Number(value) || 0)
}

export function formatDate(value) {
  if (!value) return '—'
  return new Date(value + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
