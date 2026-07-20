import { useCallback, useEffect, useState } from 'react'
import { isSupabaseConfigured, supabase } from '../lib/supabase'

const SEED = [
  { name: 'PT. Maju Jaya', type: 'Supplier', contact: 'Budi (0812...)', terms: 'Net 30' },
  { name: 'CV. Teknik Abadi', type: 'Customer', contact: 'Agus (0856...)', terms: 'Cash' },
  { name: 'Krakatau Steel', type: 'Supplier', contact: 'Sales (021...)', terms: 'Net 60' },
]

export function usePartners() {
  const [partners, setPartners] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setPartners(SEED.map((r) => ({ ...r, id: r.name })))
      setLoading(false)
      return
    }
    try {
      const { data, error: err } = await supabase
        .from('partners')
        .select('*')
        .order('name', { ascending: true })
      if (err) throw err
      setPartners(data)
    } catch (e) {
      setError(e)
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [])

  const addPartner = useCallback(
    async ({ name, type, contact, terms }) => {
      const row = { name: name.trim(), type, contact: contact.trim(), terms }
      if (!isSupabaseConfigured) {
        setPartners((prev) => [{ ...row, id: row.name }, ...prev])
        return
      }
      const { error: err } = await supabase.from('partners').insert(row)
      if (err) throw err
      await load()
    },
    [load],
  )

  useEffect(() => {
    load()
  }, [load])

  return { partners, loading, error, addPartner, reload: load }
}
