const TITLES = {
  dashboard: 'Financial Control',
  income: 'Income Management',
  'master-data': 'Master Data',
  expenditure: 'Expenditure',
}

export default function TopNav({ view }) {
  const title = TITLES[view] || 'Financial Control'

  return (
    <header className="sticky top-0 right-0 z-30 flex w-full items-center justify-between bg-surface/80 px-6 py-3 shadow-sm backdrop-blur-md dark:bg-surface-dim/80">
      <div className="flex items-center gap-4">
        <button className="rounded-lg bg-surface-container-low p-2 text-on-surface transition-colors hover:text-primary md:hidden">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <h1 className="font-headline text-lg font-bold tracking-tight text-on-surface dark:text-surface-bright">
          {title}
        </h1>
        <nav className="ml-6 hidden gap-6 sm:flex">
          <button
            type="button"
            className="border-b-2 border-primary py-4 font-label font-bold text-primary hover:text-primary dark:text-primary-fixed-dim dark:hover:text-primary-fixed-dim"
          >
            Dashboard
          </button>
          <button
            type="button"
            className="py-4 font-label text-on-surface-variant hover:text-primary dark:text-surface-variant dark:hover:text-primary-fixed-dim"
          >
            Reports
          </button>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden sm:block">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-on-surface-variant/70">
            search
          </span>
          <input
            type="text"
            placeholder={view === 'master-data' ? 'Search records...' : 'Search invoices...'}
            className="w-64 rounded-full border-none bg-surface-container-low py-2 pl-10 pr-4 text-sm font-body text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <button className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-primary dark:hover:text-primary-fixed-dim">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-primary dark:hover:text-primary-fixed-dim">
          <span className="material-symbols-outlined">account_circle</span>
        </button>
      </div>
    </header>
  )
}
