import { useState } from 'react'
import KpiCards from './income/KpiCards.jsx'
import InvoiceTable from './income/InvoiceTable.jsx'
import RecordInvoiceForm from './income/RecordInvoiceForm.jsx'
import CreateInvoiceModal from './income/CreateInvoiceModal.jsx'
import { useInvoices } from '../lib/useInvoices'

export default function Income() {
  const [modalOpen, setModalOpen] = useState(false)
  const { addInvoice } = useInvoices()

  return (
    <div className="flex w-full flex-1 flex-col gap-8 p-6 md:p-8">
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8">
        {/* Page Header */}
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="mb-2 font-headline text-3xl font-bold tracking-tight text-on-surface">
              Manajemen Pemasukan
            </h2>
            <p className="max-w-2xl font-body text-lg leading-relaxed text-on-surface-variant">
              Track outgoing invoices, manage customer payment terms, and monitor
              accounts receivable statuses.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 rounded-xl border border-outline-variant/30 bg-surface-container px-5 py-2.5 text-sm font-bold text-primary shadow-[0_4px_20px_rgba(46,50,48,0.04)] transition-colors hover:bg-surface-container-high">
              <span className="material-symbols-outlined text-[18px]">
                download
              </span>
              Export
            </button>
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-on-primary shadow-[0_4px_20px_rgba(46,50,48,0.06)] transition-colors hover:bg-primary/90"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              Create Invoice
            </button>
          </div>
        </div>

        <KpiCards />

        <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <InvoiceTable />
          </div>
          <div className="xl:col-span-1">
            <RecordInvoiceForm onSave={addInvoice} />
          </div>
        </div>
      </div>

      <CreateInvoiceModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={addInvoice}
      />
    </div>
  )
}
