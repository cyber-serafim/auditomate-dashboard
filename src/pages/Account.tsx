
import React from 'react';
import { AccountSettings } from '@/components/settings/AccountSettings';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const Account = () => {
  const { isAuthenticated, hasAccess } = useAuth();

  // Verify the user has manage access to the account settings
  if (!isAuthenticated || !hasAccess('settings', 'manage')) {
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Керування користувачами</h1>
        <p className="text-sm text-muted-foreground">
          Створення та редагування користувачів, налаштування прав доступу.
        </p>
      </div>
      <AccountSettings />
    </div>
  );
};

export default Account;
