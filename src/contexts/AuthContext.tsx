
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Типи доступу
export type AccessLevel = 'view' | 'manage';

// Доступ до сторінок
export type PageAccess = {
  [key: string]: AccessLevel;
};

// Користувач
export type User = {
  id: string;
  username: string;
  password: string; // В реальному додатку це має бути хеш
  name: string;
  role: string;
  pageAccess: PageAccess;
};

// Контекст авторизації
type AuthContextType = {
  user: User | null;
  users: User[];
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (user: User) => void;
  deleteUser: (id: string) => void;
  hasAccess: (page: string, level?: AccessLevel) => boolean;
};

// Створення контексту
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Ключ для localStorage
const USERS_STORAGE_KEY = 'auditomate_users';
const AUTH_USER_KEY = 'auditomate_auth_user';

// Дефолтні користувачі
const defaultUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123',
    name: 'Адміністратор',
    role: 'Адміністратор',
    pageAccess: {
      dashboard: 'manage',
      scans: 'manage',
      services: 'manage',
      assets: 'manage',
      alerts: 'manage',
      monitoring: 'manage',
      security: 'manage',
      connections: 'manage',
      notifications: 'manage',
      settings: 'manage',
      account: 'manage'
    }
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>(() => {
    const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
    return storedUsers ? JSON.parse(storedUsers) : defaultUsers;
  });
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem(AUTH_USER_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Зберігаємо користувачів при зміні
  useEffect(() => {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  }, [users]);

  // Зберігаємо поточного користувача при зміні
  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_USER_KEY);
    }
  }, [user]);

  // Перевірка авторизації
  const isAuthenticated = !!user;

  // Вхід користувача
  const login = (username: string, password: string): boolean => {
    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  // Вихід користувача
  const logout = () => {
    setUser(null);
    navigate('/login');
  };

  // Додавання нового користувача
  const addUser = (newUser: Omit<User, 'id'>) => {
    const user: User = {
      ...newUser,
      id: Date.now().toString(),
    };
    setUsers([...users, user]);
  };

  // Оновлення даних користувача
  const updateUser = (updatedUser: User) => {
    setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
    
    // Якщо оновлюємо поточного користувача, також оновлюємо його стан
    if (user && user.id === updatedUser.id) {
      setUser(updatedUser);
    }
  };

  // Видалення користувача
  const deleteUser = (id: string) => {
    setUsers(users.filter(u => u.id !== id));
  };

  // Перевірка доступу
  const hasAccess = (page: string, level: AccessLevel = 'view'): boolean => {
    if (!user) return false;
    
    const userAccess = user.pageAccess[page];
    
    if (!userAccess) return false;
    
    // 'manage' має повний доступ (і view, і manage)
    if (userAccess === 'manage') return true;
    
    // 'view' має доступ тільки для перегляду
    return level === 'view';
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        isAuthenticated,
        login,
        logout,
        addUser,
        updateUser,
        deleteUser,
        hasAccess
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Хук для використання контексту авторизації
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
