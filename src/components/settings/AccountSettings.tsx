import React, { useState } from 'react';
import { useAuth, User, AccessLevel } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { UserPlus, Pencil, Trash2, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const userFormSchema = z.object({
  username: z.string().min(3, { message: 'Ім\'я користувача має бути не менше 3 символів' }),
  password: z.string().min(6, { message: 'Пароль має бути не менше 6 символів' }),
  name: z.string().min(2, { message: 'Ім\'я має бути не менше 2 символів' }),
  role: z.string().min(2, { message: 'Роль має бути не менше 2 символів' }),
  pageAccess: z.record(z.string(), z.enum(['view', 'manage']))
});

type UserFormValues = z.infer<typeof userFormSchema>;

const pages = [
  { id: 'dashboard', name: 'Дашборд' },
  { id: 'scans', name: 'Сканування' },
  { id: 'services', name: 'Сервіси' },
  { id: 'assets', name: 'Активи' },
  { id: 'alerts', name: 'Сповіщення' },
  { id: 'monitoring', name: 'Моніторинг' },
  { id: 'security', name: 'Безпека' },
  { id: 'connections', name: 'Підключення' },
  { id: 'notifications', name: 'Налаштування сповіщень' },
  { id: 'settings', name: 'Налаштування' },
  { id: 'account', name: 'Керування користувачами' }
];

export const AccountSettings = () => {
  const { users, addUser, updateUser, deleteUser } = useAuth();
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      username: '',
      password: '',
      name: '',
      role: '',
      pageAccess: pages.reduce((acc, page) => {
        acc[page.id] = 'view';
        return acc;
      }, {} as Record<string, AccessLevel>)
    }
  });

  const resetForm = () => {
    form.reset({
      username: '',
      password: '',
      name: '',
      role: '',
      pageAccess: pages.reduce((acc, page) => {
        acc[page.id] = 'view';
        return acc;
      }, {} as Record<string, AccessLevel>)
    });
  };

  const createUser = (userData: Omit<User, "id">) => {
    if (!userData.role) {
      userData.role = "user"; // Default role if none provided
    }
    addUser(userData);
    toast({
      title: "Користувача додано",
      description: `Користувача ${userData.name} успішно додано до системи.`,
    });
    setIsAddDialogOpen(false);
    resetForm();
  };

  const handleAddUser = (data: UserFormValues) => {
    createUser(data);
  };

  const handleEditUser = (data: UserFormValues) => {
    if (selectedUser) {
      const updatedUser = { ...selectedUser, ...data };
      updateUser(updatedUser);
      toast({
        title: "Користувача оновлено",
        description: `Дані користувача ${data.name} успішно оновлено.`,
      });
      setIsEditDialogOpen(false);
      setSelectedUser(null);
    }
  };

  const handleDeleteUser = () => {
    if (selectedUser) {
      deleteUser(selectedUser.id);
      toast({
        title: "Користувача видалено",
        description: `Користувача ${selectedUser.name} було видалено з системи.`,
        variant: "destructive",
      });
      setIsDeleteDialogOpen(false);
      setSelectedUser(null);
    }
  };

  const openEditDialog = (user: User) => {
    setSelectedUser(user);
    form.reset({
      username: user.username,
      password: user.password,
      name: user.name,
      role: user.role,
      pageAccess: { ...user.pageAccess }
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (user: User) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const getAccessLevelBadge = (level: AccessLevel) => {
    if (level === 'manage') {
      return <Badge variant="default">Керування</Badge>;
    }
    return <Badge variant="outline">Перегляд</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Управління користувачами</h2>
          <p className="text-muted-foreground">
            Додавайте та керуйте користувачами системи та їх правами доступу
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Додати користувача
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Додати нового користувача</DialogTitle>
              <DialogDescription>
                Створіть нового користувача та налаштуйте його права доступу
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleAddUser)} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Логін</FormLabel>
                        <FormControl>
                          <Input placeholder="user123" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Пароль</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ім'я</FormLabel>
                        <FormControl>
                          <Input placeholder="Іван Петренко" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Роль</FormLabel>
                        <FormControl>
                          <Input placeholder="Оператор" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Доступ до сторінок</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Налаштуйте рівень доступу користувача до кожної сторінки
                    </p>
                  </div>

                  <div className="border rounded-md">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Сторінка</TableHead>
                          <TableHead>Рівень доступу</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pages.map((page) => (
                          <TableRow key={page.id}>
                            <TableCell className="font-medium">{page.name}</TableCell>
                            <TableCell>
                              <FormField
                                control={form.control}
                                name={`pageAccess.${page.id}`}
                                render={({ field }) => (
                                  <FormItem>
                                    <Select
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                    >
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Виберіть рівень" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="view">Перегляд</SelectItem>
                                        <SelectItem value="manage">Керування</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </FormItem>
                                )}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Скасувати
                  </Button>
                  <Button type="submit">Додати користувача</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Користувачі системи</CardTitle>
          <CardDescription>
            Всього користувачів: {users.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ім'я</TableHead>
                <TableHead>Логін</TableHead>
                <TableHead>Роль</TableHead>
                <TableHead>Права доступу</TableHead>
                <TableHead className="text-right">Дії</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-primary" />
                      <span className="text-xs">
                        {Object.entries(user.pageAccess).filter(([_, level]) => level === 'manage').length} сторінок з керуванням
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(user)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openDeleteDialog(user)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Діалог редагування користувача */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Редагувати користувача</DialogTitle>
            <DialogDescription>
              Змініть дані користувача та його права доступу
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleEditUser)} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Логін</FormLabel>
                      <FormControl>
                        <Input placeholder="user123" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Пароль</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ім'я</FormLabel>
                      <FormControl>
                        <Input placeholder="Іван Петренко" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Роль</FormLabel>
                      <FormControl>
                        <Input placeholder="Оператор" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Доступ до сторінок</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Налаштуйте рівень доступу користувача до кожної сторінки
                  </p>
                </div>

                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Сторінка</TableHead>
                        <TableHead>Рівень доступу</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pages.map((page) => (
                        <TableRow key={page.id}>
                          <TableCell className="font-medium">{page.name}</TableCell>
                          <TableCell>
                            <FormField
                              control={form.control}
                              name={`pageAccess.${page.id}`}
                              render={({ field }) => (
                                <FormItem>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Виберіть рівень" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="view">Перегляд</SelectItem>
                                      <SelectItem value="manage">Керування</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </FormItem>
                              )}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Скасувати
                </Button>
                <Button type="submit">Зберегти зміни</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Діалог видалення користувача */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Видалити користувача</DialogTitle>
            <DialogDescription>
              Ви впевнені, що хочете видалити користувача {selectedUser?.name}?
              Ця дія є незворотною.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Скасувати
            </Button>
            <Button variant="destructive" onClick={handleDeleteUser}>
              Видалити
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
