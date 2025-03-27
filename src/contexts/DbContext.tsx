
import React, { createContext, useContext, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth, User } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface DbContextProps {
  // Користувачі
  fetchUsers: () => Promise<User[]>;
  saveUser: (user: Omit<User, 'id'>) => Promise<User | null>;
  updateUserData: (user: User) => Promise<boolean>;
  removeUser: (id: string) => Promise<boolean>;
  
  // Сканування
  saveScanResult: (scanData: any) => Promise<boolean>;
  fetchScanResults: () => Promise<any[]>;
  
  // Сервіси
  fetchServices: () => Promise<any[]>;
  saveService: (serviceData: any) => Promise<boolean>;
}

const DbContext = createContext<DbContextProps | undefined>(undefined);

export const DbProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();

  // Функції для роботи з користувачами
  const fetchUsers = async (): Promise<User[]> => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*');
        
      if (error) throw error;
      
      return data as User[];
    } catch (error) {
      console.error('Помилка при отриманні користувачів:', error);
      toast.error('Не вдалося отримати користувачів');
      return [];
    }
  };

  const saveUser = async (userData: Omit<User, 'id'>): Promise<User | null> => {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert([userData])
        .select();
        
      if (error) throw error;
      
      return data[0] as User;
    } catch (error) {
      console.error('Помилка при збереженні користувача:', error);
      toast.error('Не вдалося зберегти користувача');
      return null;
    }
  };

  const updateUserData = async (userData: User): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('users')
        .update(userData)
        .eq('id', userData.id);
        
      if (error) throw error;
      
      return true;
    } catch (error) {
      console.error('Помилка при оновленні користувача:', error);
      toast.error('Не вдалося оновити користувача');
      return false;
    }
  };

  const removeUser = async (id: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      return true;
    } catch (error) {
      console.error('Помилка при видаленні користувача:', error);
      toast.error('Не вдалося видалити користувача');
      return false;
    }
  };

  // Функції для роботи зі скануваннями
  const saveScanResult = async (scanData: any): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('scan_results')
        .insert([scanData]);
        
      if (error) throw error;
      
      return true;
    } catch (error) {
      console.error('Помилка при збереженні результатів сканування:', error);
      toast.error('Не вдалося зберегти результати сканування');
      return false;
    }
  };

  const fetchScanResults = async (): Promise<any[]> => {
    try {
      const { data, error } = await supabase
        .from('scan_results')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      return data;
    } catch (error) {
      console.error('Помилка при отриманні результатів сканування:', error);
      toast.error('Не вдалося отримати результати сканування');
      return [];
    }
  };

  // Функції для роботи з сервісами
  const fetchServices = async (): Promise<any[]> => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*');
        
      if (error) throw error;
      
      return data;
    } catch (error) {
      console.error('Помилка при отриманні сервісів:', error);
      toast.error('Не вдалося отримати сервіси');
      return [];
    }
  };

  const saveService = async (serviceData: any): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('services')
        .insert([serviceData]);
        
      if (error) throw error;
      
      return true;
    } catch (error) {
      console.error('Помилка при збереженні сервісу:', error);
      toast.error('Не вдалося зберегти сервіс');
      return false;
    }
  };

  const value = {
    fetchUsers,
    saveUser,
    updateUserData,
    removeUser,
    saveScanResult,
    fetchScanResults,
    fetchServices,
    saveService
  };

  return (
    <DbContext.Provider value={value}>
      {children}
    </DbContext.Provider>
  );
};

export const useDb = () => {
  const context = useContext(DbContext);
  if (!context) {
    throw new Error('useDb must be used within a DbProvider');
  }
  return context;
};
