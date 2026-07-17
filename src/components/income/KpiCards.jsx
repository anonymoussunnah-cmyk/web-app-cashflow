function KpiCard({ children, className = '' }) {
  return (
    <div
      className={
        'relative flex flex-col justify-between overflow-hidden rounded-2xl border border-outline-variant/20 bg-surface-container-low p-6 shadow-[0_4px_20px_rgba(46,50,48,0.06)] group ' +
        className
      }
    >
      {children}
    </div>
  )
}

export default function KpiCards() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
      {/* Total Outstanding */}
      <KpiCard>
        <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/5 blur-xl transition-colors duration-500 group-hover:bg-primary/10" />
        <div>
          <div className="mb-4 flex items-start justify-between">
            <div className="rounded-lg bg-primary-container/30 p-2.5 text-primary">
              <span className="material-symbols-outlined">
                account_balance_wallet
              </span>
            </div>
            <span className="flex items-center gap-1 rounded-full bg-error-container px-2.5 py-1 text-xs font-bold text-on-error-container">
              <span className="material-symbols-outlined text-[14px]">
                arrow_upward
              </span>
              12%
            </span>
          </div>
          <p className="mb-1 text-sm font-semibold uppercase tracking-wider font-body text-on-surface-variant">
            Total Outstanding
          </p>
          <h3 className="font-headline text-2xl font-bold text-on-surface">
            Rp 45.200.000
          </h3>
        </div>
      </KpiCard>

      {/* Total Overdue */}
      <KpiCard>
        <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-error/5 blur-xl transition-colors duration-500 group-hover:bg-error/10" />
        <div>
          <div className="mb-4 flex items-start justify-between">
            <div className="rounded-lg bg-error-container/50 p-2.5 text-error">
              <span className="material-symbols-outlined">warning</span>
            </div>
            <span className="font-body text-sm font-semibold text-error">
              3 Invoices
            </span>
          </div>
          <p className="mb-1 text-sm font-semibold uppercase tracking-wider font-body text-on-surface-variant">
            Total Overdue
          </p>
          <h3 className="font-headline text-2xl font-bold text-on-surface">
            Rp 8.500.000
          </h3>
        </div>
      </KpiCard>

      {/* Received This Month */}
      <KpiCard className="md:col-span-2">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-secondary-container/20 to-transparent" />
        <div className="relative z-10 flex h-full flex-col justify-between">
          <div className="mb-4 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-secondary-container p-2.5 text-tertiary">
                <span className="material-symbols-outlined">price_check</span>
              </div>
              <p className="text-sm font-semibold uppercase tracking-wider font-body text-on-surface-variant">
                Received This Month
              </p>
            </div>
            <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
              October 2023
            </span>
          </div>
          <div className="flex items-end justify-between">
            <h3 className="font-headline text-4xl font-bold text-on-surface">
              Rp 128.450.000
            </h3>
            <div className="flex h-12 w-24 items-end overflow-hidden rounded-lg bg-surface-container-high opacity-70">
              <div className="mx-0.5 h-1/3 w-1/4 rounded-t-sm bg-tertiary-fixed-dim" />
              <div className="mx-0.5 h-2/3 w-1/4 rounded-t-sm bg-tertiary-fixed-dim" />
              <div className="mx-0.5 h-1/2 w-1/4 rounded-t-sm bg-tertiary-fixed-dim" />
              <div className="mx-0.5 h-full w-1/4 rounded-t-sm bg-tertiary" />
            </div>
          </div>
        </div>
      </KpiCard>
    </div>
  )
}
