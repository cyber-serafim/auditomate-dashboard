
import { createClient } from '@supabase/supabase-js';

// URL та ключ доступу до вашого власного Supabase
const supabaseUrl = 'http://your-server-ip:8000'; // Замініть на IP вашого сервера
const supabaseAnonKey = 'your-anon-key'; // Замініть на ваш публічний ключ

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
