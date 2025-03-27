
import { createClient } from '@supabase/supabase-js';

// Для простоти використовуємо значення напряму, але в реальному проекті 
// краще використовувати змінні середовища
const supabaseUrl = 'YOUR_SUPABASE_URL'; // Замініть на URL вашого проекту
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY'; // Замініть на ваш публічний ключ

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
