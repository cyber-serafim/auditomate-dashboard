
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Типи мов
export type Language = 'uk' | 'en';

// Типи для контексту
interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Створення контексту
const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

// Переклади
const translations: Record<Language, Record<string, string>> = {
  uk: {
    // Навігація
    'nav.home': 'Головна',
    'nav.services': 'Послуги',
    'nav.about': 'Про нас',
    'nav.contact': 'Контакти',
    
    // Герой секція
    'hero.title': 'КІБЕРБЕЗПЕКА УКРАЇНИ',
    'hero.subtitle': 'МАТРИЦЯ ЗАХИСТУ',
    'hero.description': 'Захист інформаційних систем від кіберзагроз - наша місія',
    'hero.button': 'Наші послуги',
    
    // Послуги
    'services.title': 'Наші послуги',
    'services.penetration': 'Тестування на проникнення',
    'services.penetration.desc': 'Комплексна перевірка захищеності інформаційних систем від хакерських атак',
    'services.audit': 'Аудит безпеки',
    'services.audit.desc': 'Всебічний аналіз захищеності інформаційних систем та процесів',
    'services.monitoring': 'Моніторинг безпеки',
    'services.monitoring.desc': 'Безперервний моніторинг та виявлення загроз у реальному часі',
    'services.incident': 'Реагування на інциденти',
    'services.incident.desc': 'Швидке та ефективне реагування на кіберінциденти',
    
    // Про нас
    'about.title': 'Про нас',
    'about.content': 'Компанія Cyber Security Ukraine – провідний експерт у сфері кібербезпеки в Україні. Ми працюємо для захисту критичної інфраструктури та бізнесу від сучасних кіберзагроз.',
    'about.experience': 'Роки досвіду',
    'about.clients': 'Задоволених клієнтів',
    'about.specialists': 'Сертифікованих спеціалістів',
    
    // Форма контактів
    'contact.title': 'Зв\'яжіться з нами',
    'contact.description': 'Заповніть форму нижче, і ми зв\'яжемося з вами найближчим часом',
    'contact.name': 'Ваше ім\'я',
    'contact.email': 'Електронна пошта',
    'contact.phone': 'Номер телефону',
    'contact.message': 'Повідомлення',
    'contact.submit': 'Надіслати',
    'contact.success': 'Дякуємо! Ваше повідомлення успішно надіслано',
    'contact.error': 'Виникла помилка при надсиланні повідомлення. Спробуйте ще раз',
    
    // Футер
    'footer.rights': 'Всі права захищені',
    'footer.policy': 'Політика конфіденційності',
    'footer.terms': 'Умови використання',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.about': 'About Us',
    'nav.contact': 'Contact',
    
    // Hero section
    'hero.title': 'CYBER SECURITY UKRAINE',
    'hero.subtitle': 'MATRIX OF PROTECTION',
    'hero.description': 'Protecting information systems from cyber threats is our mission',
    'hero.button': 'Our Services',
    
    // Services
    'services.title': 'Our Services',
    'services.penetration': 'Penetration Testing',
    'services.penetration.desc': 'Comprehensive security assessment against hacker attacks',
    'services.audit': 'Security Audit',
    'services.audit.desc': 'Thorough analysis of information systems and processes security',
    'services.monitoring': 'Security Monitoring',
    'services.monitoring.desc': 'Continuous monitoring and real-time threat detection',
    'services.incident': 'Incident Response',
    'services.incident.desc': 'Fast and effective response to cyber incidents',
    
    // About us
    'about.title': 'About Us',
    'about.content': 'Cyber Security Ukraine is a leading expert in cybersecurity in Ukraine. We work to protect critical infrastructure and businesses from modern cyber threats.',
    'about.experience': 'Years of experience',
    'about.clients': 'Satisfied clients',
    'about.specialists': 'Certified specialists',
    
    // Contact form
    'contact.title': 'Contact Us',
    'contact.description': 'Fill out the form below and we will contact you as soon as possible',
    'contact.name': 'Your Name',
    'contact.email': 'Email',
    'contact.phone': 'Phone Number',
    'contact.message': 'Message',
    'contact.submit': 'Submit',
    'contact.success': 'Thank you! Your message has been successfully sent',
    'contact.error': 'An error occurred while sending your message. Please try again',
    
    // Footer
    'footer.rights': 'All rights reserved',
    'footer.policy': 'Privacy Policy',
    'footer.terms': 'Terms of Use',
  },
};

// Провайдер для контексту
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('uk');
  
  // Функція перекладу
  const t = (key: string): string => {
    return translations[language][key] || key;
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Хук для використання контексту
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  
  return context;
};
