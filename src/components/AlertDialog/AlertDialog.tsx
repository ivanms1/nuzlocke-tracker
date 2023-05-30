import React from "react";
import {
  AlertDialog as AlertDialogComponent,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./Components";
import { buttonVariants } from "../Button/Button";

interface AlertDialogProps {
  open: boolean;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  onClose: () => void;
  onConfirm: () => void;
  className?: string;
  confirmText?: string;
  cancelText?: string;
  destructive?: boolean;
}

function AlertDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  children,
  className,
  destructive,
  confirmText = "Confirm",
  cancelText = "Cancel",
}: AlertDialogProps) {
  return (
    <AlertDialogComponent
      open={open}
      onOpenChange={(o) => {
        if (!o) {
          onClose();
        }
      }}
    >
      <AlertDialogContent className={className}>
        {(title || description) && (
          <AlertDialogHeader>
            {title && <AlertDialogTitle>{title}</AlertDialogTitle>}
            {description && (
              <AlertDialogDescription>{description}</AlertDialogDescription>
            )}
          </AlertDialogHeader>
        )}
        {children}
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>{cancelText}</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({
              variant: destructive ? "destructive" : "default",
            })}
            onClick={onConfirm}
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogComponent>
  );
}

export default AlertDialog;
