import { Home, History, PieChart } from 'lucide-react';

export default function BottomNav({ activeTab, setActiveTab }) {
  return (
    <nav className="bottom-nav">
      <button 
        className={`nav-item ${activeTab === 'calc' ? 'active' : ''}`}
        onClick={() => setActiveTab('calc')}
      >
        <Home />
        <span>Início</span>
      </button>
      
      <button 
        className={`nav-item ${activeTab === 'history' ? 'active' : ''}`}
        onClick={() => setActiveTab('history')}
      >
        <History />
        <span>Histórico</span>
      </button>

      <button 
        className={`nav-item ${activeTab === 'dash' ? 'active' : ''}`}
        onClick={() => setActiveTab('dash')}
      >
        <PieChart />
        <span>Economia</span>
      </button>
    </nav>
  );
}
