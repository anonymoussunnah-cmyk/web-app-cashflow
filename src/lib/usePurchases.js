import { useCallback, useEffect, useState } from 'react'
import { isSupabaseConfigured, supabase } from '../lib/supabase'

const SEED = [
  {
    purchase_no: 'PRC-2023-1029',
    category: 'Material (Baja, Aluminium, etc)',
    supplier: 'PT Baja Makmur',
    item_desc: 'Baja ST41',
    amount: 4500000,
    payment_type: 'Tempo 14 Hari',
    due_date: '2023-11-12',
    status: 'Unpaid',
  },
  {
    purchase_no: 'PRC-2023-1030',
    category: 'Tools (Pahat Bubut, Endmill)',
    supplier: 'Toko Teknik Sentosa',
    item_desc: 'Endmill & Pahat',
    amount: 1250000,
    payment_type: 'Tempo 14 Hari',
    due_date: '2023-11-18',
    status: 'Unpaid',
  },
]

function generatePurchaseNo() {
  const now = new Date()
  const y = now.getFullYear()
  const rand = Math.floor(100 + Math.random() * 900)
  return `PRC-${y}-${rand}`
}

function formatDate(value) {
  if (!value) return '—'
  return new Date(value + 'T00:00:00').toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function dueDayMonth(value) {
  if (!value) return { day: '', month: '' }
  const d = new Date(value + 'T00:00:00')
  return {
    day: String(d.getDate()),
    month: d.toLocaleDateString('en-GB', { month: 'short' }),
  }
}

export function usePurchases() {
  const [purchases, setPurchases] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setPurchases(SEED.map((r) => ({ ...r, id: r.purchase_no })))
      setLoading(false)
      return
    }
    try {
      const { data, error: err } = await supabase
        .from('purchases')
        .select('*')
        .order('due_date', { ascending: true })
      if (err) throw err
      setPurchases(data)
    } catch (e) {
      setError(e)
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [])

  const addPurchase = useCallback(
    async ({ category, supplier, item_desc, amount, payment_type, due_date }) => {
      const row = {
        purchase_no: generatePurchaseNo(),
        category,
        supplier,
        item_desc,
        amount: Number(amount),
        payment_type,
        due_date,
        status: 'Unpaid',
      }
      if (!isSupabaseConfigured) {
        setPurchases((prev) => [{ ...row, id: row.purchase_no }, ...prev])
        return
      }
      const { error: err } = await supabase.from('purchases').insert(row)
      if (err) throw err
      await load()
    },
    [load],
  )

  useEffect(() => {
    load()
  }, [load])

  return { purchases, loading, error, addPurchase, reload: load }
}

export { formatDate, dueDayMonth }
