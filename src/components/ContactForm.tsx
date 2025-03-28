
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';
import { sendContactForm } from '@/lib/supabase';

// Валідаційна схема для форми
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Ім'я повинно містити щонайменше 2 символи" }),
  email: z.string().email({ message: "Введіть коректну електронну адресу" }),
  phone: z.string().min(10, { message: "Введіть коректний номер телефону" }),
  message: z.string().min(10, { message: "Повідомлення повинно містити щонайменше 10 символів" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactForm: React.FC = () => {
  const { t, language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Ініціалізуємо форму
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });
  
  // Функція обробки відправки форми
  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Додаємо інформацію про мову і відправляємо всі обов'язкові поля
      const result = await sendContactForm({
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
        language: language,
      });
      
      if (result.success) {
        toast.success(t('contact.success'));
        form.reset();
        
        // Створюємо дані для відправки в Telegram
        const telegramText = `Нове повідомлення від ${data.name}
Email: ${data.email}
Телефон: ${data.phone}
Повідомлення: ${data.message}`;
        
        // Відправка повідомлення в Telegram через бота
        const TELEGRAM_BOT_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN'; // Замініть на ваш токен
        const TELEGRAM_CHAT_ID = '@ua_serafim'; // Замініть на ваш chat_id
        
        // Відправка запиту до API Telegram
        fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: telegramText,
          }),
        });
        
        // Відправка електронного листа через Supabase Edge Function або інший сервіс
        // Цю частину потрібно реалізувати на сервері або через Edge Function
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error(t('contact.error'));
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 glassmorphism p-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">{t('contact.name')}</FormLabel>
              <FormControl>
                <Input placeholder={t('contact.name')} {...field} className="form-input" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">{t('contact.email')}</FormLabel>
              <FormControl>
                <Input placeholder="example@email.com" {...field} className="form-input" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">{t('contact.phone')}</FormLabel>
              <FormControl>
                <Input placeholder="+380..." {...field} className="form-input" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">{t('contact.message')}</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder={t('contact.message')} 
                  {...field} 
                  className="form-input min-h-[120px]" 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-primary text-background hover:bg-primary/80"
        >
          {isSubmitting ? '...' : t('contact.submit')}
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
