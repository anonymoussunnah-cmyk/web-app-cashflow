const PROFILE_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuB5I2ATLOY81DyWL7KGpFUd3M30fBtoQ60BxHKUk29yx6HP66eIEP3QOMDBVwSYKfFb9hET9aAscPFLgIePNfiPR1HZch41KUeZBOh483kHnxMyCAbYCJ_4hKqqZ3eHioo5-OrMcbCp2AIMjY0OJw0URM2iRAW0pt6VSkVpOOEaQ7x9tUUoDX5WonhQHlfO-4bauu7Bz4PWBNUqG7cYR6UQXJLxjxhnZciHX8YxfW4XrWxWvFX1gyqCYg'

const mainTabs = [
  { icon: 'analytics', label: 'Projections', active: true },
  { icon: 'payments', label: 'Expenditure' },
  { icon: 'receipt_long', label: 'Income' },
  { icon: 'database', label: 'Master Data' },
]

const footerTabs = [
  { icon: 'settings', label: 'Settings' },
  { icon: 'help', label: 'Support' },
]

function NavLink({ icon, label, active }) {
  return (
    <a
      href="#"
      className={
        active
          ? 'flex items-center gap-3 px-4 py-3 text-primary dark:text-primary-fixed-dim font-bold bg-secondary-container/50 dark:bg-secondary-container/20 rounded-lg hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-all duration-200 scale-95'
          : 'flex items-center gap-3 px-4 py-3 text-on-surface-variant dark:text-surface-variant hover:text-primary transition-colors hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-all duration-200'
      }
    >
      <span className="material-symbols-outlined">{icon}</span>
      {label}
    </a>
  )
}

export default function SideNav() {
  return (
    <nav className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col justify-between border-r border-outline-variant/30 bg-surface-container-low pb-6 md:flex">
      <div>
        <div className="mb-4 border-b border-outline-variant/20 p-6">
          <div className="mb-2 flex items-center gap-3">
            <div className="h-10 w-10 overflow-hidden rounded-full bg-surface-container-highest">
              <img
                alt="Workshop Owner Profile"
                className="h-full w-full object-cover"
                src={PROFILE_IMG}
              />
            </div>
            <div>
              <h2 className="font-headline text-xl font-bold leading-tight text-primary dark:text-primary-fixed-dim">
                Terra Machining
              </h2>
              <p className="text-xs font-body text-on-surface-variant">
                Bengkel Bubut Management
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2 px-4 font-body leading-relaxed">
          {mainTabs.map((t) => (
            <NavLink key={t.label} {...t} />
          ))}
        </div>

        <div className="mt-6 px-4">
          <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-body font-semibold text-on-primary shadow-sm transition-colors hover:bg-surface-tint">
            <span className="material-symbols-outlined">add</span>
            New Transaction
          </button>
        </div>
      </div>

      <div className="mt-auto space-y-2 px-4 font-body leading-relaxed">
        {footerTabs.map((t) => (
          <NavLink key={t.label} {...t} />
        ))}
      </div>
    </nav>
  )
}
