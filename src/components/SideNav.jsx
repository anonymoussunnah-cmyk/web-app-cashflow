import { NavLink } from 'react-router-dom'

const PROFILE_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAaQvPsi3v-J_1xl76nEIRNni6ATA_S7YNr5MC3oz44oDeY2W_KrQQvfMeSajKzWHm5raCzJGpzjtzD30nG0gdp4om7m8t68h1EJWFru8A4_OjOuPA0t97coFPcClet9kMaDBpzq5NaZfrjNlysp-JEJ7UNiJg_oFkDcEJ6MOJdBFpIo-_p2HHURFyzuVSleX1fUPI2-eFQE_z7Jmec98irrJSAdRRLN5q-8XUgqRP0k3YleSAB62M5EA'

const mainTabs = [
  { to: '/', icon: 'analytics', label: 'Projections' },
  { to: '/expenditure', icon: 'payments', label: 'Expenditure' },
  { to: '/income', icon: 'receipt_long', label: 'Income' },
  { to: '/master-data', icon: 'database', label: 'Master Data' },
]

const footerTabs = [
  { to: '/settings', icon: 'settings', label: 'Settings' },
  { to: '/support', icon: 'help', label: 'Support' },
]

function TabLink({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? 'flex items-center gap-3 px-4 py-3 text-primary dark:text-primary-fixed-dim font-bold bg-secondary-container/50 dark:bg-secondary-container/20 rounded-lg hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-all duration-200 scale-95'
          : 'flex items-center gap-3 px-4 py-3 text-on-surface-variant dark:text-surface-variant hover:text-primary transition-colors hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-all duration-200'
      }
    >
      <span className="material-symbols-outlined">{icon}</span>
      {label}
    </NavLink>
  )
}

export default function SideNav() {
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
            <TabLink key={t.to} {...t} />
          ))}
        </div>

        <div className="mt-6 px-4">
          <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-bold text-on-primary shadow-[0_4px_20px_rgba(46,50,48,0.06)] transition-colors hover:bg-primary/90">
            <span className="material-symbols-outlined">add</span>
            New Transaction
          </button>
        </div>
      </div>

      <div className="mt-auto flex flex-col gap-4 border-t border-outline-variant/30 p-4">
        <div className="flex flex-col gap-1 mt-2">
          {footerTabs.map((t) => (
            <TabLink key={t.to} {...t} />
          ))}
        </div>
      </div>
    </nav>
  )
}
