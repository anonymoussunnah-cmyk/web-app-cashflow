const WEEKS = [
  { label: 'Week 1', payable: 40, receivable: 60 },
  { label: 'Week 2', payable: 80, receivable: 45 },
  { label: 'Week 3', payable: 95, receivable: 30, danger: true },
  { label: 'Week 4', payable: 20, receivable: 75 },
]

export default function CashFlowComparison() {
  return (
    <div className="flex flex-col rounded-xl border border-surface-variant/50 bg-surface p-8 soft-shadow lg:col-span-7">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h3 className="mb-1 flex items-center gap-2 font-headline text-2xl text-on-surface">
            <span className="material-symbols-outlined text-tertiary">
              bar_chart
            </span>
            Cash Flow Comparison
          </h3>
          <p className="font-body text-sm text-on-surface-variant">
            Total Tagihan (Payable) vs Total Invoice (Receivable) - Current Month
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm font-body">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-tertiary-container" />
            <span className="text-on-surface">Payable</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-primary-container" />
            <span className="text-on-surface">Receivable</span>
          </div>
        </div>
      </div>

      <div className="relative mt-auto flex h-64 items-end justify-around gap-2 border-b border-outline-variant/30 pb-4">
        <div className="pointer-events-none absolute left-0 top-0 w-full border-t border-outline-variant/10" />
        <div className="pointer-events-none absolute left-0 top-1/4 w-full border-t border-outline-variant/10" />
        <div className="pointer-events-none absolute left-0 top-2/4 w-full border-t border-outline-variant/10" />
        <div className="pointer-events-none absolute left-0 top-3/4 w-full border-t border-outline-variant/10" />

        {WEEKS.map((w) => (
          <div
            key={w.label}
            className="group z-10 flex w-16 flex-col items-center gap-2"
          >
            <div className="flex h-48 w-full items-end justify-center gap-1">
              <div
                className={
                  'h-[40%] w-5 rounded-t-sm bg-tertiary-container transition-opacity group-hover:opacity-80 ' +
                  (w.danger
                    ? 'shadow-[0_0_15px_rgba(184,50,48,0.2)]'
                    : '')
                }
                style={{ height: `${w.payable}%` }}
              />
              <div
                className="h-[60%] w-5 rounded-t-sm bg-primary-container transition-opacity group-hover:opacity-80"
                style={{ height: `${w.receivable}%` }}
              />
            </div>
            <span
              className={
                'font-label text-xs ' +
                (w.danger
                  ? 'font-bold text-error'
                  : 'text-on-surface-variant')
              }
            >
              {w.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
