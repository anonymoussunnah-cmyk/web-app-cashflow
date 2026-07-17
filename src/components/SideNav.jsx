import { useEffect, useRef, useState } from 'react'

const PROFILE_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAaQvPsi3v-J_1xl76nEIRNni6ATA_S7YNr5MC3oz44oDeY2W_KrQQvfMeSajKzWHm5raCzJGpzjtzD30nG0gdp4om7m8t68h1EJWFru8A4_OjOuPA0t97coFPcClet9kMaDBpzq5NaZfrjNlysp-JEJ7UNiJg_oFkDcEJ6MOJdBFpIo-_p2HHURFyzuVSleX1fUPI2-eFQE_z7Jmec98irrJSAdRRLN5q-8XUgqRP0k3YleSAB62M5EA'

const mainTabs = [
  { id: 'dashboard', icon: 'analytics', label: 'Projections' },
  { id: 'expenditure', icon: 'payments', label: 'Expenditure' },
  { id: 'income', icon: 'receipt_long', label: 'Income' },
  { id: 'master-data', icon: 'database', label: 'Master Data' },
]

const footerTabs = [
  { id: 'settings', icon: 'settings', label: 'Settings' },
  { id: 'support', icon: 'help', label: 'Support' },
]

function TabLink({ id, icon, label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? 'flex items-center gap-3 px-4 py-3 text-primary dark:text-primary-fixed-dim font-bold bg-secondary-container/50 dark:bg-secondary-container/20 rounded-lg hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-all duration-200 scale-95'
          : 'flex items-center gap-3 px-4 py-3 text-on-surface-variant dark:text-surface-variant hover:text-primary transition-colors hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-all duration-200'
      }
    >
      <span className="material-symbols-outlined">{icon}</span>
      {label}
    </button>
  )
}

const NEW_OPTIONS = [
  {
    label: 'New Income',
    desc: 'Create customer invoice',
    icon: 'receipt_long',
    action: 'income',
  },
  {
    label: 'New Expenditure',
    desc: 'Record a payment',
    icon: 'payments',
    action: 'expenditure',
  },
]

export default function SideNav({ view, onChangeView, onNewIncome }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const choose = (action) => {
    setOpen(false)
    if (action === 'income') onNewIncome()
    else onChangeView(action)
  }

  return (
    <nav className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col justify-between border-r border-outline-variant/30 bg-surface-container-low pb-6 md:flex">
      <div>
        <div className="mb-4 flex flex-col items-center border-b border-outline-variant/30 p-6">
          <div className="mb-3 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-secondary-container shadow-sm">
            <img
              alt="Workshop Owner Profile"
              className="h-full w-full object-cover"
              src={PROFILE_IMG}
            />
          </div>
          <h2 className="text-center font-headline text-xl font-bold text-primary dark:text-primary-fixed-dim">
            Terra Machining
          </h2>
          <p className="mt-1 text-center text-sm font-body text-on-surface-variant">
            Bengkel Bubut Management
          </p>
        </div>

        <div className="flex flex-col gap-2 px-3 py-4">
          {mainTabs.map((t) => (
            <TabLink
              key={t.id}
              {...t}
              active={view === t.id}
              onClick={() => onChangeView(t.id)}
            />
          ))}
        </div>

        <div className="relative mt-6 px-4" ref={ref}>
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-bold text-on-primary shadow-[0_4px_20px_rgba(46,50,48,0.06)] transition-colors hover:bg-primary/90"
          >
            <span className="material-symbols-outlined">add</span>
            New Transaction
          </button>

          {open && (
            <div className="absolute left-4 right-4 top-full z-50 mt-2 overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-2 shadow-[0_4px_20px_rgba(46,50,48,0.12)]">
              {NEW_OPTIONS.map((opt) => (
                <button
                  key={opt.action}
                  onClick={() => choose(opt.action)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-surface-container-high"
                >
                  <span className="material-symbols-outlined text-primary">
                    {opt.icon}
                  </span>
                  <span>
                    <span className="block font-body text-sm font-semibold text-on-surface">
                      {opt.label}
                    </span>
                    <span className="block font-body text-xs text-on-surface-variant">
                      {opt.desc}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-auto flex flex-col gap-4 border-t border-outline-variant/30 p-4">
        <div className="flex flex-col gap-1 mt-2">
          {footerTabs.map((t) => (
            <TabLink
              key={t.id}
              {...t}
              active={view === t.id}
              onClick={() => onChangeView(t.id)}
            />
          ))}
        </div>
      </div>
    </nav>
  )
}
