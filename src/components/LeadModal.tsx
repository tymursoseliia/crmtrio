import { useState, useEffect } from 'react';
import { Lead, LeadStatus, Manager } from '../types';
import { useLeads } from '../context/LeadContext';

const STATUSES: LeadStatus[] = [
  'Договор сделан', 'Дал реквизиты', 'Оплата за растаможку', 
  'Оплата за авто', 'Оплата за утиль', 'Оплата за госпошлину', 
  'Оплата за залоговый платеж', 'Оплата прочее', 'Завершено', 'Потеряно'
];

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  leadToEdit?: Lead | null;
}

export const LeadModal = ({ isOpen, onClose, leadToEdit }: LeadModalProps) => {
  const { addLead, updateLead } = useLeads();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    secondPhone: '',
    email: '',
    
    amountCar: 0,
    amountCustoms: 0,
    amountScrap: 0,
    amountDuty: 0,
    amountPledge: 0,
    amountOther: 0,

    manager: 'Игорь' as Manager,
    status: 'Договор сделан' as LeadStatus
  });

  useEffect(() => {
    if (leadToEdit) {
      setFormData({
        fullName: leadToEdit.fullName,
        phone: leadToEdit.phone,
        secondPhone: leadToEdit.secondPhone || '',
        email: leadToEdit.email || '',
        
        amountCar: leadToEdit.amountCar,
        amountCustoms: leadToEdit.amountCustoms,
        amountScrap: leadToEdit.amountScrap,
        amountDuty: leadToEdit.amountDuty,
        amountPledge: leadToEdit.amountPledge,
        amountOther: leadToEdit.amountOther,

        manager: leadToEdit.manager,
        status: leadToEdit.status
      });
    } else {
      setFormData({
        fullName: '',
        phone: '',
        secondPhone: '',
        email: '',
        
        amountCar: 0,
        amountCustoms: 0,
        amountScrap: 0,
        amountDuty: 0,
        amountPledge: 0,
        amountOther: 0,

        manager: 'Игорь',
        status: 'Договор сделан'
      });
    }
  }, [leadToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (leadToEdit) {
        await updateLead(leadToEdit.id, formData);
      } else {
        await addLead(formData);
      }
      onClose();
    } catch (error) {
      alert('Ошибка при сохранении лида');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{leadToEdit ? 'Редактировать лида' : 'Добавить лида'}</h2>
          <p>Заполните основную информацию о клиенте</p>
          <button className="close-btn" type="button" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-section">
            <h3>Контакты</h3>
            <div className="form-group">
              <label>ФИО клиента <span>*</span></label>
              <input 
                required
                type="text" 
                value={formData.fullName}
                onChange={e => setFormData({...formData, fullName: e.target.value})}
                placeholder="Иванов Иван Иванович"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Телефон <span>*</span></label>
                <input 
                  required
                  type="text" 
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  placeholder="+7 (999) 000-00-00"
                />
              </div>
              <div className="form-group">
                <label>Второй телефон</label>
                <input 
                  type="text" 
                  value={formData.secondPhone}
                  onChange={e => setFormData({...formData, secondPhone: e.target.value})}
                  placeholder="+7 (999) 000-00-00"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                placeholder="client@example.com"
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Финансы (₽)</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Сумма за машину</label>
                <input 
                  type="number" min="0" value={formData.amountCar || ''}
                  onChange={e => setFormData({...formData, amountCar: Number(e.target.value)})}
                />
              </div>
              <div className="form-group">
                <label>Сумма за растаможку</label>
                <input 
                  type="number" min="0" value={formData.amountCustoms || ''}
                  onChange={e => setFormData({...formData, amountCustoms: Number(e.target.value)})}
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Сумма за утиль</label>
                <input 
                  type="number" min="0" value={formData.amountScrap || ''}
                  onChange={e => setFormData({...formData, amountScrap: Number(e.target.value)})}
                />
              </div>
              <div className="form-group">
                <label>Сумма за госпошлину</label>
                <input 
                  type="number" min="0" value={formData.amountDuty || ''}
                  onChange={e => setFormData({...formData, amountDuty: Number(e.target.value)})}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Залоговый платеж</label>
                <input 
                  type="number" min="0" value={formData.amountPledge || ''}
                  onChange={e => setFormData({...formData, amountPledge: Number(e.target.value)})}
                />
              </div>
              <div className="form-group">
                <label>Прочее</label>
                <input 
                  type="number" min="0" value={formData.amountOther || ''}
                  onChange={e => setFormData({...formData, amountOther: Number(e.target.value)})}
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Управление</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Менеджер <span>*</span></label>
                <select 
                  value={formData.manager}
                  onChange={e => setFormData({...formData, manager: e.target.value as Manager})}
                >
                  <option value="Игорь">Игорь</option>
                  <option value="Андрей">Андрей</option>
                </select>
              </div>

              <div className="form-group">
                <label>Статус <span>*</span></label>
                <select 
                  value={formData.status}
                  onChange={e => setFormData({...formData, status: e.target.value as LeadStatus})}
                >
                  {STATUSES.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Отмена</button>
            <button type="submit" className="btn btn-primary">Сохранить</button>
          </div>
        </form>
      </div>
    </div>
  );
};
