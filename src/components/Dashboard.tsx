import { useLeads } from '../context/LeadContext';
import { LeadStatus, Lead } from '../types';

const STATUSES: LeadStatus[] = [
  'Договор заключен', 'Реквизиты предоставлены', 'Оплата авто', 
  'Оплата растаможки', 'Оплата утильсбора', 'Оплата госпошлины', 
  'Залоговый платеж', 'Прочие платежи', 'Завершено', 'Потеряно'
];

export const Dashboard = () => {
  const { leads, loading } = useLeads();

  if (loading) return <div className="loading">Загрузка данных...</div>;

  const totalLeads = leads.length;
  
  const getTotalAmount = (lead: Lead) => {
    return lead.amountCar + lead.amountCustoms + lead.amountScrap + 
           lead.amountDuty + lead.amountPledge + lead.amountOther;
  };

  const totalAmount = leads.reduce((sum, lead) => sum + getTotalAmount(lead), 0);

  // Battle Logic
  const igorLeads = leads.filter(l => l.manager === 'Игорь');
  const andreyLeads = leads.filter(l => l.manager === 'Андрей');

  const igorTotal = igorLeads.reduce((sum, lead) => sum + getTotalAmount(lead), 0);
  const andreyTotal = andreyLeads.reduce((sum, lead) => sum + getTotalAmount(lead), 0);
  
  const battleTotal = igorTotal + andreyTotal;
  const igorPercent = battleTotal === 0 ? 50 : Math.round((igorTotal / battleTotal) * 100);
  const andreyPercent = battleTotal === 0 ? 50 : 100 - igorPercent;

  return (
    <div className="dashboard">
      <div className="battle-widget">
        <h2 className="battle-title">⚔️ Битва Менеджеров</h2>
        <div className="battle-stats">
          <div className="manager-stat igor-stat">
            <div className="manager-name">Игорь</div>
            <div className="manager-amount">{igorTotal.toLocaleString('ru-RU')} ₽</div>
            <div className="manager-leads">{igorLeads.length} лидов</div>
          </div>
          <div className="battle-vs">VS</div>
          <div className="manager-stat andrey-stat text-right">
            <div className="manager-name">Андрей</div>
            <div className="manager-amount">{andreyTotal.toLocaleString('ru-RU')} ₽</div>
            <div className="manager-leads">{andreyLeads.length} лидов</div>
          </div>
        </div>
        <div className="battle-bar">
          <div className="battle-fill igor-fill" style={{ width: `${igorPercent}%` }}></div>
          <div className="battle-fill andrey-fill" style={{ width: `${andreyPercent}%` }}></div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card total-amount-card">
          <h3>Общая сумма (Все платежи)</h3>
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
