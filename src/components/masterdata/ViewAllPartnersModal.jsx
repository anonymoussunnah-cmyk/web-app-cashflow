import { useEffect } from 'react'

function TypeBadge({ type }) {
  const isSupplier = type === 'Supplier'
  return (
    <span
      className={
        'rounded-md px-2 py-1 text-xs font-bold ' +
        (isSupplier
          ? 'bg-primary-container/30 text-on-primary-container'
          : 'bg-tertiary-container/30 text-on-tertiary-container')
      }
    >
      {type}
    </span>
  )
}

export default function ViewAllPartnersModal({ open, onClose, partners, loading }) {
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
        className="flex max-h-[80vh] w-full max-w-2xl flex-col rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-6 shadow-[0_4px_20px_rgba(46,50,48,0.12)]"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between border-b border-outline-variant/20 pb-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2 text-primary">
              <span className="material-symbols-outlined text-[24px]">group</span>
            </div>
            <div>
              <h3 className="font-headline text-lg font-bold text-on-surface">
                All Partners
              </h3>
              <p className="text-xs text-on-surface-variant">
                {partners.length} partner{partners.length === 1 ? '' : 's'}
              </p>
            </div>
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

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <p className="py-6 text-center text-sm text-on-surface-variant">
              Loading partners...
            </p>
          ) : partners.length === 0 ? (
            <p className="py-6 text-center text-sm text-on-surface-variant">
              No partners yet.
            </p>
          ) : (
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-outline-variant/30 text-sm font-semibold text-on-surface-variant">
                  <th className="pb-3 pr-4 font-label">Name</th>
                  <th className="pb-3 px-4 font-label">Type</th>
                  <th className="pb-3 px-4 font-label">Contact</th>
                  <th className="pb-3 px-4 font-label">Terms</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {partners.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b border-surface-variant/50 transition-colors hover:bg-surface-container-low"
                  >
                    <td className="py-3 pr-4 font-semibold text-on-surface">
                      {p.name}
                    </td>
                    <td className="px-4 py-3">
                      <TypeBadge type={p.type} />
                    </td>
                    <td className="px-4 py-3 text-on-surface-variant">
                      {p.contact}
                    </td>
                    <td className="px-4 py-3 text-on-surface-variant">{p.terms}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
