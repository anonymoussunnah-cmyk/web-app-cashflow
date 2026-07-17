const STATUS_STYLES = {
  Overdue:
    'bg-error-container text-on-error-container border-error/20 [&_span.dot]:bg-error',
  Unpaid:
    'bg-surface-variant text-on-surface-variant border-outline-variant/50 [&_span.dot]:bg-outline',
  Partial:
    'bg-tertiary-fixed text-on-tertiary-fixed-variant border-tertiary/20 [&_span.dot]:bg-tertiary',
  Paid: 'bg-primary-fixed text-on-primary-fixed-variant border-primary/20 [&_span.dot]:bg-primary',
}

const INVOICES = [
  {
    id: 'INV-2023-089',
    customer: 'PT. Sumber Teknik',
    amount: 'Rp 3.500.000',
    sent: 'Sep 15, 2023',
    due: 'Oct 15, 2023',
    dueClass: 'text-error font-medium',
    status: 'Overdue',
  },
  {
    id: 'INV-2023-092',
    customer: 'CV. Maju Bersama',
    amount: 'Rp 12.000.000',
    sent: 'Oct 02, 2023',
    due: 'Nov 01, 2023',
    dueClass: 'text-on-surface-variant',
    status: 'Unpaid',
  },
  {
    id: 'INV-2023-094',
    customer: 'Bintang Makmur',
    amount: 'Rp 25.000.000',
    sent: 'Oct 10, 2023',
    due: 'Nov 09, 2023',
    dueClass: 'text-on-surface-variant',
    status: 'Partial',
  },
  {
    id: 'INV-2023-085',
    customer: 'Karya Sentosa Mulia',
    amount: 'Rp 8.200.000',
    sent: 'Sep 05, 2023',
    due: 'Oct 05, 2023',
    dueClass: 'text-on-surface-variant',
    status: 'Paid',
  },
]

function StatusBadge({ status }) {
  return (
    <span
      className={
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold ' +
        (STATUS_STYLES[status] || STATUS_STYLES.Unpaid)
      }
    >
      <span className="dot h-1.5 w-1.5 rounded-full" />
      {status}
    </span>
  )
}

export default function InvoiceTable() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-outline-variant/20 bg-surface-container-low shadow-[0_4px_20px_rgba(46,50,48,0.06)]">
      <div className="flex flex-col items-start justify-between gap-4 border-b border-outline-variant/30 bg-surface-bright/50 p-6 sm:flex-row sm:items-center">
        <h3 className="font-headline text-lg font-bold text-on-surface">
          Recent Invoices
        </h3>
        <div className="flex gap-2">
          <button className="flex items-center gap-1 rounded-lg border border-outline-variant/50 px-3 py-1.5 text-sm font-body text-on-surface-variant transition-colors hover:bg-surface-container-high">
            <span className="material-symbols-outlined text-[16px]">
              filter_list
            </span>
            Filter
          </button>
          <div className="relative">
            <select className="cursor-pointer appearance-none rounded-lg border-none bg-surface-container px-4 py-1.5 pr-8 text-sm font-body text-on-surface focus:ring-2 focus:ring-primary/30">
              <option>All Statuses</option>
              <option>Unpaid</option>
              <option>Paid</option>
              <option>Overdue</option>
              <option>Partial</option>
            </select>
            <span className="material-symbols-outlined pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[18px] text-on-surface-variant">
              expand_more
            </span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-outline-variant/30 bg-surface-container-low">
              {['Invoice ID', 'Customer', 'Amount', 'Date Sent', 'Due Date', 'Status', ''].map(
                (h, i) => (
                  <th
                    key={h || i}
                    className={
                      'p-4 font-body text-sm font-semibold text-on-surface-variant whitespace-nowrap ' +
                      (i === 5 ? 'text-center' : '') +
                      (i === 6 ? 'text-right' : '')
                    }
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10 font-body text-sm text-on-surface">
            {INVOICES.map((inv) => (
              <tr
                key={inv.id}
                className="group transition-colors hover:bg-surface-container-high/50"
              >
                <td className="p-4 font-medium">{inv.id}</td>
                <td className="p-4">{inv.customer}</td>
                <td className="p-4 font-bold text-tertiary">{inv.amount}</td>
                <td className="p-4 text-on-surface-variant">{inv.sent}</td>
                <td className={'p-4 ' + inv.dueClass}>{inv.due}</td>
                <td className="p-4 text-center">
                  <StatusBadge status={inv.status} />
                </td>
                <td className="p-4 text-right">
                  <button className="rounded-md p-1 text-on-surface-variant opacity-0 transition-colors hover:text-primary focus:opacity-100 group-hover:opacity-100">
                    <span className="material-symbols-outlined text-[20px]">
                      more_vert
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-outline-variant/30 bg-surface-bright/30 p-4">
        <span className="font-body text-sm text-on-surface-variant">
          Showing 1 to 4 of 24 entries
        </span>
        <div className="flex gap-1">
          <button
            disabled
            className="rounded-lg p-1.5 text-on-surface-variant transition-colors hover:bg-surface-container disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[20px]">
              chevron_left
            </span>
          </button>
          <button className="rounded-lg p-1.5 font-bold text-primary transition-colors hover:bg-surface-container">
            <span className="material-symbols-outlined text-[20px]">
              chevron_right
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
