import SideNav from './components/SideNav.jsx'
import TopNav from './components/TopNav.jsx'
import Dashboard from './components/Dashboard.jsx'

export default function App() {
  return (
    <div className="flex h-screen overflow-hidden bg-background text-on-background antialiased">
      <SideNav />
      <main className="flex-1 md:ml-64 flex flex-col h-screen overflow-y-auto bg-background">
        <TopNav />
        <Dashboard />
      </main>
    </div>
  )
}
