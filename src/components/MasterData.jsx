import { useState } from 'react'
import { usePartners } from '../lib/usePartners'
import AddPartnerModal from './masterdata/AddPartnerModal'

const CATEGORIES = [
  { icon: 'construction', label: 'Material Besi' },
  { icon: 'precision_manufacturing', label: 'Tools Mesin CNC' },
  { icon: 'engineering', label: 'Jasa Subcon' },
]

const BANNER_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCE6eL-nkEGYGKQJ0pNjzYHexxlP2J-0mxVglymo88aPWxi6SEJBeRIjzSb_O-AHj2-i14FZAachJo0PLO5roV3SLzti6J9KHU2KsN5jRETZ96hsKxMHUeZxl8EPu4wWDVLztzMMhmDVhBO2WiVAQ3TAyUCkaiDqvAcXwsxhiquHkR0zk4pVPm9Qw1kyMEI8wBdIq5ZvU_W8ihFfQ5giGDRRbBbXfDoAR_9FZlgMNbIebtHebj157gnWA'

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

function PartnersDirectory({ partners, loading, onAdd }) {
  return (
    <section className="flex h-full flex-col rounded-2xl border border-surface-variant/50 bg-surface-container-lowest p-6 soft-shadow">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 font-headline text-xl font-semibold text-on-surface">
            <span className="material-symbols-outlined text-primary">contacts</span>
            Partners Directory
          </h3>
          <p className="mt-1 text-sm text-on-surface-variant">
            Customers and Suppliers
          </p>
        </div>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 rounded-lg border border-outline-variant/30 bg-secondary-container px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-tertiary-fixed"
        >
          <span className="material-symbols-outlined text-sm">person_add</span>
          Add Partner
        </button>
      </div>

      <div className="flex-1 overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-outline-variant/30 text-sm font-semibold text-on-surface-variant">
              <th className="pb-3 pr-4 font-label">Name</th>
              <th className="pb-3 px-4 font-label">Type</th>
              <th className="pb-3 px-4 font-label">Contact</th>
              <th className="pb-3 px-4 font-label">Terms</th>
              <th className="pb-3 pl-4 text-right font-label">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {loading ? (
              <tr>
                <td colSpan={5} className="py-4 text-center text-on-surface-variant">
                  Loading partners...
                </td>
              </tr>
            ) : partners.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-4 text-center text-on-surface-variant">
                  No partners yet.
                </td>
              </tr>
            ) : (
              partners.map((p) => (
                <tr
                  key={p.id}
                  className="group border-b border-surface-variant/50 transition-colors hover:bg-surface-container-low"
                >
                  <td className="py-4 pr-4 font-semibold text-on-surface">
                    {p.name}
                  </td>
                  <td className="px-4 py-4">
                    <TypeBadge type={p.type} />
                  </td>
                  <td className="px-4 py-4 text-on-surface-variant">
                    {p.contact}
                  </td>
                  <td className="px-4 py-4 text-on-surface-variant">{p.terms}</td>
                  <td className="py-4 pl-4 text-right opacity-0 transition-opacity group-hover:opacity-100">
                    <button className="p-1 text-tertiary hover:text-tertiary-container">
                      <span className="material-symbols-outlined text-[20px]">
                        edit
                      </span>
                    </button>
                    <button className="p-1 text-error hover:text-error-container">
                      <span className="material-symbols-outlined text-[20px]">
                        delete
                      </span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-center">
        <button className="text-sm font-semibold text-primary hover:underline">
          View All Partners
        </button>
      </div>
    </section>
  )
}

function Categories() {
  return (
    <section className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-surface-variant/30 bg-surface-container-highest/30 p-6 soft-shadow">
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/5 blur-2xl" />
      <div className="relative z-10 mb-6 flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 font-headline text-xl font-semibold text-on-surface">
            <span className="material-symbols-outlined text-tertiary">category</span>
            Categories
          </h3>
          <p className="mt-1 text-sm text-on-surface-variant">
            Transaction Grouping
          </p>
        </div>
        <button className="rounded-full p-2 text-primary transition-colors hover:bg-secondary-container">
          <span className="material-symbols-outlined">add_circle</span>
        </button>
      </div>

      <div className="relative z-10 flex-1 space-y-3">
        {CATEGORIES.map((c) => (
          <div
            key={c.label}
            className="group flex items-center justify-between rounded-xl border border-surface-variant/50 bg-surface-container-lowest p-3 transition-colors hover:border-primary/30"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-container text-on-surface-variant">
                <span className="material-symbols-outlined text-[18px]">
                  {c.icon}
                </span>
              </div>
              <span className="text-sm font-semibold text-on-surface">
                {c.label}
              </span>
            </div>
            <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
              <button className="text-on-surface-variant hover:text-primary">
                <span className="material-symbols-outlined text-[18px]">edit</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function PromoBanner() {
  return (
    <div className="relative h-32 w-full overflow-hidden rounded-2xl soft-shadow">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-80 mix-blend-multiply"
        style={{ backgroundImage: `url('${BANNER_IMG}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-tertiary/60" />
      <div className="absolute inset-0 z-10 flex items-center justify-between px-8">
        <div className="text-on-primary">
          <h4 className="font-headline text-xl font-bold">Keep Data Organized</h4>
          <p className="font-label text-sm opacity-90">
            Accurate master data ensures reliable projections.
          </p>
        </div>
        <span className="material-symbols-outlined text-4xl text-on-primary opacity-50">
          data_object
        </span>
      </div>
    </div>
  )
}

export default function MasterData() {
  const [modalOpen, setModalOpen] = useState(false)
  const { partners, loading, addPartner } = usePartners()

  return (
    <div className="w-full space-y-8 p-6 lg:p-8">
      <div className="mx-auto w-full max-w-7xl space-y-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <PartnersDirectory
              partners={partners}
              loading={loading}
              onAdd={() => setModalOpen(true)}
            />
          </div>
          <div>
            <Categories />
          </div>
        </div>
        <PromoBanner />
      </div>

      <AddPartnerModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={addPartner}
      />
    </div>
  )
}
