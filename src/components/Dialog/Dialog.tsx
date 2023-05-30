import {
  Dialog as DialogComponent,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "./Components";

interface DialogProps {
  open: boolean;
  title?: string;
  description?: string;
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
}

const Dialog = ({
  title,
  description,
  children,
  open,
  onClose,
  className,
}: DialogProps) => {
  return (
    <DialogComponent
      open={open}
      onOpenChange={(o) => {
        if (!o) {
          onClose();
        }
      }}
    >
      <DialogContent className={className}>
        {(title || description) && (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
        )}
        {children}
      </DialogContent>
    </DialogComponent>
  );
};

export default Dialog;
