import { useEffect } from 'react'
import { InvoiceForm } from './RecordInvoiceForm.jsx'

export default function CreateInvoiceModal({ open, onClose, onSave }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/40 p-4 backdrop-blur-sm"
      onMouseDown={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-6 shadow-[0_4px_20px_rgba(46,50,48,0.12)]"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between border-b border-outline-variant/20 pb-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2 text-primary">
              <span className="material-symbols-outlined text-[24px]">
                post_add
              </span>
            </div>
            <h3 className="font-headline text-lg font-bold text-on-surface">
              Create Invoice
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary"
            aria-label="Close"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <InvoiceForm onClose={onClose} onSave={onSave} />
      </div>
    </div>
  )
}
