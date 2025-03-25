
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Schema for service creation validation
const serviceSchema = z.object({
  name: z.string().min(2, { message: "Назва сервісу повинна містити мінімум 2 символи" }),
  type: z.string({ required_error: "Виберіть тип сервісу" }),
  description: z.string().min(5, { message: "Опис сервісу повинен містити мінімум 5 символів" }),
});

type ServiceFormValues = z.infer<typeof serviceSchema>;

interface CreateServiceFormProps {
  onSubmit: (values: ServiceFormValues) => void;
  onCancel: () => void;
}

const CreateServiceForm = ({ onSubmit, onCancel }: CreateServiceFormProps) => {
  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: "",
      type: "",
      description: "",
    },
  });

  const handleSubmit = (values: ServiceFormValues) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Назва сервісу</FormLabel>
              <FormControl>
                <Input placeholder="Введіть назву сервісу" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Тип сервісу</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Виберіть тип сервісу" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="web">Веб-сервіс</SelectItem>
                  <SelectItem value="database">База даних</SelectItem>
                  <SelectItem value="storage">Сховище</SelectItem>
                  <SelectItem value="auth">Автентифікація</SelectItem>
                  <SelectItem value="network">Мережа</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Тип сервісу визначає його категорію та моніторингові параметри
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Опис сервісу</FormLabel>
              <FormControl>
                <Input placeholder="Введіть опис сервісу" {...field} />
              </FormControl>
              <FormDescription>
                Короткий опис призначення та функцій сервісу
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={onCancel} type="button">
            Скасувати
          </Button>
          <Button type="submit">Додати сервіс</Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateServiceForm;
