
import React from 'react';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  
  const toggleLanguage = () => {
    setLanguage(language === 'uk' ? 'en' : 'uk');
  };
  
  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={toggleLanguage}
      className="text-white hover:text-primary transition-colors"
    >
      {language === 'uk' ? 'EN' : 'UA'}
    </Button>
  );
};

export default LanguageSwitcher;
