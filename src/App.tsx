import { useState } from 'react';
import { LeadProvider } from './context/LeadContext';
import { Dashboard } from './components/Dashboard';
import { LeadTable } from './components/LeadTable';
import { LeadModal } from './components/LeadModal';
import { Lead } from './types';
import { Plus } from 'lucide-react';

function AppContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leadToEdit, setLeadToEdit] = useState<Lead | null>(null);

  const handleAddLead = () => {
    setLeadToEdit(null);
    setIsModalOpen(true);
  };

  const handleEditLead = (lead: Lead) => {
    setLeadToEdit(lead);
    setIsModalOpen(true);
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo-container">
          <div className="logo-icon">👑</div>
          <h1>CRM Trio</h1>
        </div>
        <button className="btn btn-primary" onClick={handleAddLead}>
          <Plus size={20} />
          Добавить лида
        </button>
      </header>
      
      <main className="main-content">
        <Dashboard />
        <div className="table-section">
          <div className="section-header">
            <h2>Список лидов</h2>
          </div>
          <LeadTable onEdit={handleEditLead} />
        </div>
      </main>

      <LeadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        leadToEdit={leadToEdit}
      />
    </div>
  );
}

function App() {
  return (
    <LeadProvider>
      <AppContent />
    </LeadProvider>
  );
}

export default App;
