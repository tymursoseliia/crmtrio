import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Lead } from '../types';
import { supabase } from '../supabase';

interface LeadContextType {
  leads: Lead[];
  loading: boolean;
  addLead: (lead: Omit<Lead, 'id' | 'createdAt'>) => Promise<void>;
  updateLead: (id: string, updatedLead: Partial<Lead>) => Promise<void>;
  deleteLead: (id: string) => Promise<void>;
}

const LeadContext = createContext<LeadContextType | undefined>(undefined);

export const useLeads = () => {
  const context = useContext(LeadContext);
  if (!context) throw new Error('useLeads must be used within a LeadProvider');
  return context;
};

// Mapper to convert snake_case DB to camelCase Frontend
const mapDbToLead = (dbLead: any): Lead => ({
  id: dbLead.id,
  fullName: dbLead.full_name,
  phone: dbLead.phone,
  secondPhone: dbLead.second_phone,
  email: dbLead.email,
  
  amountCar: Number(dbLead.amount_car || 0),
  amountCustoms: Number(dbLead.amount_customs || 0),
  amountScrap: Number(dbLead.amount_scrap || 0),
  amountDuty: Number(dbLead.amount_duty || 0),
  amountPledge: Number(dbLead.amount_pledge || 0),
  amountOther: Number(dbLead.amount_other || 0),

  manager: dbLead.manager,
  status: dbLead.status,
  createdAt: new Date(dbLead.created_at).getTime(),
});

export const LeadProvider = ({ children }: { children: ReactNode }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching leads:', error);
    } else if (data) {
      setLeads(data.map(mapDbToLead));
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const addLead = async (leadData: Omit<Lead, 'id' | 'createdAt'>) => {
    const dbData = {
      full_name: leadData.fullName,
      phone: leadData.phone,
      second_phone: leadData.secondPhone || null,
      email: leadData.email || null,
      
      amount_car: leadData.amountCar,
      amount_customs: leadData.amountCustoms,
      amount_scrap: leadData.amountScrap,
      amount_duty: leadData.amountDuty,
      amount_pledge: leadData.amountPledge,
      amount_other: leadData.amountOther,

      manager: leadData.manager,
      status: leadData.status,
    };

    const { data, error } = await supabase
      .from('leads')
      .insert([dbData])
      .select()
      .single();

    if (error) {
      console.error('Error adding lead:', error);
      throw error;
    }

    if (data) {
      setLeads((prev) => [mapDbToLead(data), ...prev]);
    }
  };

  const updateLead = async (id: string, updatedLead: Partial<Lead>) => {
    const dbData: any = {};
    if (updatedLead.fullName !== undefined) dbData.full_name = updatedLead.fullName;
    if (updatedLead.phone !== undefined) dbData.phone = updatedLead.phone;
    if (updatedLead.secondPhone !== undefined) dbData.second_phone = updatedLead.secondPhone || null;
    if (updatedLead.email !== undefined) dbData.email = updatedLead.email || null;
    
    if (updatedLead.amountCar !== undefined) dbData.amount_car = updatedLead.amountCar;
    if (updatedLead.amountCustoms !== undefined) dbData.amount_customs = updatedLead.amountCustoms;
    if (updatedLead.amountScrap !== undefined) dbData.amount_scrap = updatedLead.amountScrap;
    if (updatedLead.amountDuty !== undefined) dbData.amount_duty = updatedLead.amountDuty;
    if (updatedLead.amountPledge !== undefined) dbData.amount_pledge = updatedLead.amountPledge;
    if (updatedLead.amountOther !== undefined) dbData.amount_other = updatedLead.amountOther;

    if (updatedLead.manager !== undefined) dbData.manager = updatedLead.manager;
    if (updatedLead.status !== undefined) dbData.status = updatedLead.status;

    const { data, error } = await supabase
      .from('leads')
      .update(dbData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating lead:', error);
      throw error;
    }

    if (data) {
      setLeads((prev) => prev.map((lead) => (lead.id === id ? mapDbToLead(data) : lead)));
    }
  };

  const deleteLead = async (id: string) => {
    const { error } = await supabase
      .from('leads')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting lead:', error);
      throw error;
    }

    setLeads((prev) => prev.filter((lead) => lead.id !== id));
  };

  return (
    <LeadContext.Provider value={{ leads, loading, addLead, updateLead, deleteLead }}>
      {children}
    </LeadContext.Provider>
  );
};
