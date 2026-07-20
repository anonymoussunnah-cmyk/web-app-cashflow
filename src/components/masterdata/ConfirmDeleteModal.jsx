import { useEffect } from 'react'

export default function ConfirmDeleteModal({ open, onClose, onConfirm, partner }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
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
        className="w-full max-w-sm rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-6 shadow-[0_4px_20px_rgba(46,50,48,0.12)]"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-lg bg-error-container/50 p-2 text-error">
            <span className="material-symbols-outlined text-[24px]">warning</span>
          </div>
          <h3 className="font-headline text-lg font-bold text-on-surface">
            Delete Partner
          </h3>
        </div>

        <p className="mb-6 font-body text-sm leading-relaxed text-on-surface-variant">
          Are you sure you want to delete{' '}
          <span className="font-semibold text-on-surface">{partner?.name}</span>?
          This action cannot be undone.
        </p>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl bg-surface-container px-4 py-2.5 text-sm font-bold text-on-surface transition-colors hover:bg-surface-container-high"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-[2] rounded-xl bg-error px-4 py-2.5 text-sm font-bold text-on-error shadow-sm transition-colors hover:bg-error/90"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
