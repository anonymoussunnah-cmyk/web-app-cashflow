export default function TopNav() {
  return (
    <header className="sticky top-0 right-0 z-30 flex w-full items-center justify-between border-b border-outline-variant/20 bg-surface/80 px-6 py-3 shadow-sm backdrop-blur-md dark:bg-surface-dim/80">
      <div className="flex items-center gap-4">
        <h1 className="font-headline text-lg font-bold text-on-surface dark:text-surface-bright">
          Financial Control
        </h1>
        <nav className="ml-6 hidden gap-6 sm:flex">
          <a
            href="#"
            className="border-b-2 border-primary py-4 font-label font-bold text-primary hover:text-primary dark:text-primary-fixed-dim dark:hover:text-primary-fixed-dim"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="py-4 font-label text-on-surface-variant hover:text-primary dark:text-surface-variant dark:hover:text-primary-fixed-dim"
          >
            Reports
          </a>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden rounded-full transition-all focus-within:ring-2 focus-within:ring-primary/20 sm:block">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-sm text-on-surface-variant">
            search
          </span>
          <input
            type="text"
            placeholder="Search..."
            className="w-48 rounded-full border border-outline-variant/50 bg-surface/80 py-2 pl-10 pr-4 text-sm font-label text-on-surface focus:border-primary focus:outline-none dark:bg-surface-dim/80"
          />
        </div>

        <button className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container-highest hover:text-primary">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container-highest hover:text-primary">
          <span className="material-symbols-outlined">account_circle</span>
        </button>
      </div>
    </header>
  )
}
