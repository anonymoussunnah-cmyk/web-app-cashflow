import { Routes, Route } from 'react-router-dom'
import SideNav from './components/SideNav.jsx'
import TopNav from './components/TopNav.jsx'
import Dashboard from './components/Dashboard.jsx'
import Income from './components/Income.jsx'
import MasterData from './components/MasterData.jsx'

export default function App() {
  return (
    <div className="flex h-screen overflow-hidden bg-background text-on-background antialiased">
      <SideNav />
      <main className="flex flex-1 flex-col h-screen ml-0 md:ml-64 overflow-y-auto bg-background">
        <TopNav />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/income" element={<Income />} />
          <Route path="/master-data" element={<MasterData />} />
        </Routes>
      </main>
    </div>
  )
}
