
import { createClient } from '@supabase/supabase-js';

// URL та ключ доступу до Supabase
// При розміщенні сайту на хостингу вам потрібно буде замінити ці значення
// на реальні дані вашого Supabase проекту
const supabaseUrl = process.env.SUPABASE_URL || 'https://your-supabase-url.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Функція для надсилання повідомлень з форми зворотного зв'язку
export const sendContactForm = async (data: {
  name: string;
  email: string;
  phone: string;
  message: string;
  language: string;
}) => {
  try {
    // Збереження у базу даних
    const { error } = await supabase
      .from('contacts')
      .insert([data]);
      
    if (error) throw error;
    
    // Можна також додати функцію для надсилання електронної пошти
    // у цьому місці, використовуючи Supabase Edge Functions
    
    return { success: true };
  } catch (error) {
    console.error('Помилка при надсиланні форми:', error);
    return { success: false, error };
  }
};
