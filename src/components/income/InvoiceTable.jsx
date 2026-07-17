import { useMemo, useState } from 'react'
import { formatCurrency, formatDate } from '../../lib/useInvoices'

const STATUS_STYLES = {
  Overdue:
    'bg-error-container text-on-error-container border-error/20 [&_span.dot]:bg-error',
  Unpaid:
    'bg-surface-variant text-on-surface-variant border-outline-variant/50 [&_span.dot]:bg-outline',
  Partial:
    'bg-tertiary-fixed text-on-tertiary-fixed-variant border-tertiary/20 [&_span.dot]:bg-tertiary',
  Paid: 'bg-primary-fixed text-on-primary-fixed-variant border-primary/20 [&_span.dot]:bg-primary',
}

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

const FILTERS = ['All Statuses', 'Unpaid', 'Paid', 'Overdue', 'Partial']

export default function InvoiceTable({ invoices, loading }) {

  const visible = useMemo(
    () =>
      filter === 'All Statuses'
        ? invoices
        : invoices.filter((inv) => inv.status === filter),
    [invoices, filter],
  )

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
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="cursor-pointer appearance-none rounded-lg border-none bg-surface-container px-4 py-1.5 pr-8 text-sm font-body text-on-surface focus:ring-2 focus:ring-primary/30"
            >
              {FILTERS.map((f) => (
                <option key={f}>{f}</option>
              ))}
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
            {loading ? (
              <tr>
                <td colSpan={7} className="p-6 text-center text-on-surface-variant">
                  Loading invoices...
                </td>
              </tr>
            ) : visible.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-6 text-center text-on-surface-variant">
                  No invoices found.
                </td>
              </tr>
            ) : (
              visible.map((inv) => (
                <tr
                  key={inv.id}
                  className="group transition-colors hover:bg-surface-container-high/50"
                >
                  <td className="p-4 font-medium">{inv.invoice_no}</td>
                  <td className="p-4">{inv.customer}</td>
                  <td className="p-4 font-bold text-tertiary">
                    {formatCurrency(inv.amount)}
                  </td>
                  <td className="p-4 text-on-surface-variant">
                    {formatDate(inv.date_sent)}
                  </td>
                  <td
                    className={
                      'p-4 ' +
                      (inv.status === 'Overdue'
                        ? 'text-error font-medium'
                        : 'text-on-surface-variant')
                    }
                  >
                    {formatDate(inv.due_date)}
                  </td>
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
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-outline-variant/30 bg-surface-bright/30 p-4">
        <span className="font-body text-sm text-on-surface-variant">
          Showing {visible.length} of {invoices.length} entries
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
