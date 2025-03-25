
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage
} from "@/components/ui/form";
import { Search, AlertTriangle, Server, Network, Globe, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const scanFormSchema = z.object({
  name: z.string().min(3, { message: "Назва сканування має містити щонайменше 3 символи" }),
  scanType: z.enum(["full", "network", "api", "service"], { 
    required_error: "Будь ласка, оберіть тип сканування" 
  }),
  target: z.string().min(1, { message: "Будь ласка, вкажіть ціль сканування" }),
  targetType: z.enum(["ip", "subnet", "service", "url"], { 
    required_error: "Будь ласка, оберіть тип цілі" 
  }),
});

type ScanFormValues = z.infer<typeof scanFormSchema>;

interface StartScanDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStartScan: (values: ScanFormValues) => void;
}

const StartScanDialog = ({ open, onOpenChange, onStartScan }: StartScanDialogProps) => {
  const { toast } = useToast();
  const form = useForm<ScanFormValues>({
    resolver: zodResolver(scanFormSchema),
    defaultValues: {
      name: `Сканування від ${new Date().toLocaleDateString('uk-UA')}`,
      scanType: "full",
      target: "",
      targetType: "ip",
    },
  });

  const onSubmit = (values: ScanFormValues) => {
    onStartScan(values);
    onOpenChange(false);
    toast({
      title: "Сканування запущено",
      description: `Розпочато ${values.name} для ${values.target}`,
    });
  };

  const getScanTypeIcon = (type: string) => {
    switch (type) {
      case "full": return <Globe className="h-4 w-4" />;
      case "network": return <Network className="h-4 w-4" />;
      case "api": return <Globe className="h-4 w-4" />;
      case "service": return <Server className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Запустити нове сканування</DialogTitle>
          <DialogDescription>
            Налаштуйте параметри для запуску сканування вразливостей.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Назва сканування</FormLabel>
                  <FormControl>
                    <Input placeholder="Введіть назву сканування" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="scanType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Тип сканування</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-2 gap-4"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="full" />
                        </FormControl>
                        <FormLabel className="font-normal flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          Повне сканування
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="network" />
                        </FormControl>
                        <FormLabel className="font-normal flex items-center gap-2">
                          <Network className="h-4 w-4" />
                          Мережеве сканування
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="api" />
                        </FormControl>
                        <FormLabel className="font-normal flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          API сканування
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="service" />
                        </FormControl>
                        <FormLabel className="font-normal flex items-center gap-2">
                          <Server className="h-4 w-4" />
                          Сканування сервісів
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="targetType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Тип цілі</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-2 gap-4"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="ip" />
                        </FormControl>
                        <FormLabel className="font-normal">IP-адреса</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="subnet" />
                        </FormControl>
                        <FormLabel className="font-normal">Підмережа</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="service" />
                        </FormControl>
                        <FormLabel className="font-normal">Сервіс</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="url" />
                        </FormControl>
                        <FormLabel className="font-normal">URL</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="target"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ціль сканування</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input className="pl-10" placeholder="Вкажіть ціль сканування" {...field} />
                    </div>
                  </FormControl>
                  <FormDescription>
                    {form.watch("targetType") === "ip" && "Введіть IP-адресу, наприклад 192.168.1.1"}
                    {form.watch("targetType") === "subnet" && "Введіть підмережу, наприклад 192.168.1.0/24"}
                    {form.watch("targetType") === "service" && "Введіть назву сервісу або ID"}
                    {form.watch("targetType") === "url" && "Введіть URL, наприклад https://example.com"}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Скасувати
              </Button>
              <Button type="submit">
                <Search className="mr-2 h-4 w-4" />
                Запустити сканування
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default StartScanDialog;
