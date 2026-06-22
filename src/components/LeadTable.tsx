import { useLeads } from '../context/LeadContext';
import { Lead } from '../types';

interface LeadTableProps {
  onEdit: (lead: Lead) => void;
}

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'Договор заключен':
      return { backgroundColor: '#e2e8f0', color: '#334155' };
    case 'Реквизиты предоставлены':
      return { backgroundColor: '#ede9fe', color: '#6d28d9' };
    case 'Оплата авто':
    case 'Оплата растаможки':
    case 'Оплата утильсбора':
    case 'Оплата госпошлины':
    case 'Залоговый платеж':
    case 'Прочие платежи':
      return { backgroundColor: '#fef3c7', color: '#d97706' };
    case 'Завершено':
      return { backgroundColor: '#d1fae5', color: '#065f46' };
    case 'Потеряно':
      return { backgroundColor: '#fee2e2', color: '#b91c1c' };
    default:
      return { backgroundColor: '#f1f5f9', color: '#475569' };
  }
};

export const LeadTable = ({ onEdit }: LeadTableProps) => {
  const { leads, loading, deleteLead } = useLeads();

  if (loading) return null;

  const getTotalAmount = (lead: Lead) => {
    return lead.amountCar + lead.amountCustoms + lead.amountScrap + 
           lead.amountDuty + lead.amountPledge + lead.amountOther;
  };

  return (
    <div className="table-container">
      <table className="leads-table">
        <thead>
          <tr>
            <th>Клиент</th>
            <th>Сумма (Итого)</th>
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
              <td className="amount-cell">
                {getTotalAmount(lead).toLocaleString('ru-RU')} ₽
              </td>
              <td>
                <span 
                  className="status-badge"
                  style={getStatusStyle(lead.status)}
                >
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
