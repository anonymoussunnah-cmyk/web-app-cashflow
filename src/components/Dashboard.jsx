import PredictionCalculator from './PredictionCalculator.jsx'
import CashFlowComparison from './CashFlowComparison.jsx'

export default function Dashboard() {
  return (
    <div className="w-full flex-1 p-6 md:p-10">
      <div className="mx-auto w-full max-w-7xl flex-1">
        <div className="mb-8">
          <h2 className="mb-2 font-headline text-3xl font-bold text-on-surface">
            Dashboard Proyeksi
          </h2>
          <p className="font-body text-lg text-on-surface-variant">
            Predict and monitor your workshop's cash flow stability.
          </p>
        </div>

        <div className="mb-8 flex items-start gap-4 rounded-xl border border-error/20 bg-error-container p-6 text-on-error-container soft-shadow">
          <div className="mt-1 rounded-full bg-error/10 p-3">
            <span
              className="material-symbols-outlined text-error"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              warning
            </span>
          </div>
          <div>
            <h3 className="mb-1 font-headline text-xl font-semibold text-error">
              Projected Deficit Detected
            </h3>
            <p className="max-w-3xl font-body leading-relaxed text-on-error-container/80">
              Based on upcoming payables and average receivable collection rates,
              a cash flow deficit is projected in the next 14 days. Review master
              data and expedite pending invoices.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <PredictionCalculator />
          <CashFlowComparison />
        </div>
      </div>
    </div>
  )
}
