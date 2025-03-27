
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Header from './Header';
import Sidebar from './Sidebar';

export function MainLayout() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Перевіряємо авторизацію
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex w-full bg-background">
      <Sidebar />
      <div className="flex flex-col w-full ml-64">
        <Header />
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
