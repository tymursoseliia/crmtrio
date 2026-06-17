import { useLeads } from '../context/LeadContext';
import { Lead } from '../types';

interface LeadTableProps {
  onEdit: (lead: Lead) => void;
}

export const LeadTable = ({ onEdit }: LeadTableProps) => {
  const { leads, loading, deleteLead } = useLeads();

  if (loading) return null;

  return (
    <div className="table-container">
      <table className="leads-table">
        <thead>
          <tr>
            <th>Клиент</th>
            <th>Сумма</th>
            <th>Статус</th>
            <th>Менеджер</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td>
                <div className="client-info">
                  <div className="avatar">{lead.fullName.charAt(0).toUpperCase()}</div>
                  <div>
                    <div className="client-name">{lead.fullName}</div>
                    <div className="client-phone">{lead.phone}</div>
                  </div>
                </div>
              </td>
              <td className="amount-cell">{lead.depositAmount.toLocaleString('ru-RU')} ₽</td>
              <td>
                <span className={`status-badge status-${lead.status.replace(/\s+/g, '-')}`}>
                  {lead.status}
                </span>
              </td>
              <td>
                <span className={`manager-badge manager-${lead.manager === 'Игорь' ? 'igor' : 'andrey'}`}>
                  {lead.manager}
                </span>
              </td>
              <td>
                <div className="actions">
                  <button className="btn-icon edit" onClick={() => onEdit(lead)}>✏️</button>
                  <button className="btn-icon delete" onClick={() => deleteLead(lead.id)}>🗑️</button>
                </div>
              </td>
            </tr>
          ))}
          {leads.length === 0 && (
            <tr>
              <td colSpan={5} className="empty-state">Нет лидов</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
