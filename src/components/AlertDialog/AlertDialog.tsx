import React from "react";
import { Loader2 } from "lucide-react";

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

import { cn } from "@/utils/cn";

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
  isLoading?: boolean;
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
  isLoading,
}: AlertDialogProps) {
  console.log("open", open);
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
          <AlertDialogCancel disabled={isLoading} onClick={onClose}>
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            className={cn(
              "min-w-[90px]",
              buttonVariants({
                variant: destructive ? "destructive" : "default",
              })
            )}
            onClick={isLoading ? undefined : onConfirm}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              confirmText
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogComponent>
  );
}

export default AlertDialog;
