
import React, { useEffect, useState } from 'react';
import MatrixBackground from '@/components/MatrixBackground';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ContactForm from '@/components/ContactForm';
import { Button } from '@/components/ui/button';
import { Shield, Search, Bell, Clock } from 'lucide-react';

const LandingPage: React.FC = () => {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  
  // Ефект для відстеження скролу
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Прокрутка до розділу
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Матричний фон */}
      <MatrixBackground />
      
      {/* Навігаційне меню */}
      <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/ab1b174d-36d0-4b26-b8bd-a14492231ac3.png" 
              alt="Cyber Security Ukraine Logo" 
              className="h-12" 
            />
          </div>
          
          <div className="flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')} 
              className="text-white hover:text-primary transition-colors"
            >
              {t('nav.home')}
            </button>
            <button 
              onClick={() => scrollToSection('services')} 
              className="text-white hover:text-primary transition-colors"
            >
              {t('nav.services')}
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-white hover:text-primary transition-colors"
            >
              {t('nav.about')}
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="text-white hover:text-primary transition-colors"
            >
              {t('nav.contact')}
            </button>
            <LanguageSwitcher />
          </div>
        </div>
      </nav>
      
      {/* Основний контент */}
      <div className="content-container flex-grow">
        {/* Герой секція */}
        <section id="home" className="min-h-screen flex items-center relative pt-20">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white glitch">
                {t('hero.title')}
              </h1>
              <p className="text-xl md:text-2xl text-primary mb-8 flicker">
                {t('hero.subtitle')}
              </p>
              <p className="text-lg text-gray-300 mb-12">
                {t('hero.description')}
              </p>
              <Button 
                onClick={() => scrollToSection('services')} 
                className="bg-primary text-background hover:bg-primary/80"
                size="lg"
              >
                {t('hero.button')}
              </Button>
            </div>
          </div>
        </section>
        
        {/* Секція послуг */}
        <section id="services" className="py-24 relative">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-white">
              {t('services.title')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Послуга 1 */}
              <div className="glassmorphism p-6 flex flex-col items-center text-center">
                <div className="bg-primary/20 p-4 rounded-full mb-6">
                  <Search className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">
                  {t('services.penetration')}
                </h3>
                <p className="text-gray-300">
                  {t('services.penetration.desc')}
                </p>
              </div>
              
              {/* Послуга 2 */}
              <div className="glassmorphism p-6 flex flex-col items-center text-center">
                <div className="bg-primary/20 p-4 rounded-full mb-6">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">
                  {t('services.audit')}
                </h3>
                <p className="text-gray-300">
                  {t('services.audit.desc')}
                </p>
              </div>
              
              {/* Послуга 3 */}
              <div className="glassmorphism p-6 flex flex-col items-center text-center">
                <div className="bg-primary/20 p-4 rounded-full mb-6">
                  <Bell className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">
                  {t('services.monitoring')}
                </h3>
                <p className="text-gray-300">
                  {t('services.monitoring.desc')}
                </p>
              </div>
              
              {/* Послуга 4 */}
              <div className="glassmorphism p-6 flex flex-col items-center text-center">
                <div className="bg-primary/20 p-4 rounded-full mb-6">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">
                  {t('services.incident')}
                </h3>
                <p className="text-gray-300">
                  {t('services.incident.desc')}
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Секція про нас */}
        <section id="about" className="py-24 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-white">
                {t('about.title')}
              </h2>
              
              <div className="glassmorphism p-8 mb-12">
                <p className="text-lg text-gray-300 mb-8 text-center">
                  {t('about.content')}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <h3 className="text-4xl font-bold text-primary mb-2">7+</h3>
                    <p className="text-white">{t('about.experience')}</p>
                  </div>
                  <div>
                    <h3 className="text-4xl font-bold text-primary mb-2">100+</h3>
                    <p className="text-white">{t('about.clients')}</p>
                  </div>
                  <div>
                    <h3 className="text-4xl font-bold text-primary mb-2">25+</h3>
                    <p className="text-white">{t('about.specialists')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Секція контактів */}
        <section id="contact" className="py-24 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-white">
                {t('contact.title')}
              </h2>
              <p className="text-gray-300 text-center mb-12">
                {t('contact.description')}
              </p>
              
              <ContactForm />
            </div>
          </div>
        </section>
        
        {/* Футер */}
        <footer className="py-12 border-t border-gray-800">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <img 
                  src="/lovable-uploads/ab1b174d-36d0-4b26-b8bd-a14492231ac3.png" 
                  alt="Cyber Security Ukraine Logo" 
                  className="h-10" 
                />
              </div>
              
              <div className="mb-6 md:mb-0 text-center md:text-left">
                <p className="text-gray-400">
                  &copy; 2023 Cyber Security Ukraine. {t('footer.rights')}
                </p>
              </div>
              
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-primary">
                  {t('footer.policy')}
                </a>
                <a href="#" className="text-gray-400 hover:text-primary">
                  {t('footer.terms')}
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
