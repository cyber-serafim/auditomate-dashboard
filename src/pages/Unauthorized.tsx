
import React from 'react';
import { Shield, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center text-center max-w-md p-6">
        <div className="bg-primary/10 rounded-full p-6 mb-6">
          <Shield className="h-16 w-16 text-primary" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Доступ обмежено</h1>
        <p className="text-muted-foreground mb-6">
          У вас недостатньо прав для доступу до цієї сторінки. Зверніться до адміністратора для отримання необхідних прав доступу.
        </p>
        <div className="flex gap-4">
          <Button onClick={() => navigate(-1)} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Повернутися назад
          </Button>
          <Button onClick={() => navigate('/')}>
            На головну
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
