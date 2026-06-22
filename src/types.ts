export type LeadStatus = 
  | 'Договор заключен'
  | 'Реквизиты предоставлены'
  | 'Оплата авто'
  | 'Оплата растаможки'
  | 'Оплата утильсбора'
  | 'Оплата госпошлины'
  | 'Залоговый платеж'
  | 'Прочие платежи'
  | 'Завершено'
  | 'Потеряно';

export type Manager = 'Игорь' | 'Андрей';

export interface Lead {
  id: string;
  fullName: string;
  phone: string;
  secondPhone?: string;
  email?: string;
  whoseLead?: string;
  
  amountCar: number;
  amountCustoms: number;
  amountScrap: number;
  amountDuty: number;
  amountPledge: number;
  amountOther: number;

  manager: Manager;
  status: LeadStatus;
  createdAt: number;
}
