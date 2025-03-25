
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CreateServiceForm from './CreateServiceForm';

export interface ServiceFormValues {
  name: string;
  type: string;
  description: string;
}

interface AddServiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: ServiceFormValues) => void;
}

const AddServiceDialog = ({ open, onOpenChange, onSubmit }: AddServiceDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Додати новий сервіс</DialogTitle>
          <DialogDescription>
            Заповніть форму для додавання нового сервісу до системи моніторингу.
          </DialogDescription>
        </DialogHeader>
        <CreateServiceForm 
          onSubmit={onSubmit} 
          onCancel={() => onOpenChange(false)} 
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddServiceDialog;
