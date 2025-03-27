
import React from 'react';
import { Bell, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import LogoutButton from '@/components/auth/LogoutButton';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="w-full h-16 border-b border-border/40 backdrop-blur-sm bg-background/80 flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center space-x-2">
        <span className="font-bold text-lg tracking-tight">AuditoMate</span>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive flex items-center justify-center text-[10px] text-white font-semibold">3</span>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Налаштування</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Профіль</DropdownMenuItem>
            <DropdownMenuItem>Налаштування</DropdownMenuItem>
            <DropdownMenuItem>Сповіщення</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <a href="/settings/account">Керування акаунтами</a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <LogoutButton />
      </div>
    </header>
  );
};

export default Header;
