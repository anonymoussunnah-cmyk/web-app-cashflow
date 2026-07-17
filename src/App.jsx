import { useState } from 'react'
import SideNav from './components/SideNav.jsx'
import TopNav from './components/TopNav.jsx'
import Dashboard from './components/Dashboard.jsx'
import Income from './components/Income.jsx'
import MasterData from './components/MasterData.jsx'
import Expenditure from './components/Expenditure.jsx'

export default function App() {
  const [view, setView] = useState('dashboard')
  const [openInvoice, setOpenInvoice] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-background text-on-background antialiased">
      <SideNav view={view} onChangeView={setView} onNewIncome={() => { setView('income'); setOpenInvoice(true) }} />
      <main className="flex flex-1 flex-col h-screen ml-0 md:ml-64 overflow-y-auto bg-background">
        <TopNav view={view} />
        {view === 'dashboard' && <Dashboard />}
        {view === 'income' && <Income openModal={openInvoice} onCloseModal={() => setOpenInvoice(false)} />}
        {view === 'master-data' && <MasterData />}
        {view === 'expenditure' && <Expenditure />}
      </main>
    </div>
  )
}
