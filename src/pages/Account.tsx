
import React, { useEffect, useState } from 'react';
import { AccountSettings } from '@/components/settings/AccountSettings';
import { useAuth } from '@/contexts/AuthContext';
import { useDb } from '@/contexts/DbContext';
import { Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const Account = () => {
  const { isAuthenticated, hasAccess } = useAuth();
  const { fetchUsers } = useDb();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        await fetchUsers();
      } catch (error) {
        console.error("Помилка при завантаженні користувачів:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      loadUsers();
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, fetchUsers]);

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
      
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <AccountSettings />
      )}
    </div>
  );
};

export default Account;
