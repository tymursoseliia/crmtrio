import { useLeads } from '../context/LeadContext';
import { LeadStatus } from '../types';

const STATUSES: LeadStatus[] = [
  'Договор сделан', 'Дал реквизиты', 'Оплата за растаможку', 
  'Оплата за авто', 'Оплата за утиль', 'Оплата за госпошлину', 
  'Оплата за залоговый платеж', 'Оплата прочее', 'Завершено', 'Потеряно'
];

export const Dashboard = () => {
  const { leads, loading } = useLeads();

  if (loading) return <div className="loading">Загрузка данных...</div>;

  const totalLeads = leads.length;
  const totalAmount = leads.reduce((sum, lead) => sum + lead.depositAmount, 0);

  return (
    <div className="dashboard">
      <div className="stats-grid">
        <div className="stat-card total-amount-card">
          <h3>Общая сумма депозитов</h3>
          <p className="amount">{totalAmount.toLocaleString('ru-RU')} ₽</p>
        </div>
        <div className="stat-card total-leads-card">
          <h3>Всего лидов</h3>
          <p className="amount">{totalLeads}</p>
        </div>
      </div>
      
      <div className="status-grid">
        {STATUSES.map(status => {
          const count = leads.filter(l => l.status === status).length;
          const percentage = totalLeads === 0 ? 0 : Math.round((count / totalLeads) * 100);
          
          return (
            <div key={status} className="status-card">
              <div className="status-header">
                <h4>{status}</h4>
                <span className="count">{count}</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
              </div>
              <p className="percentage">{percentage}%</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
