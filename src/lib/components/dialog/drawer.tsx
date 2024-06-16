"use client";

import { FC, PropsWithChildren, ReactNode, useEffect, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "~lib/utils";

export interface IDrawerProps {
  trigger: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  isBackgroundInteractive?: boolean;
  classNames?: {
    content: string;
  };
}

export const Drawer: FC<PropsWithChildren<IDrawerProps>> = ({
  trigger,
  open,
  onOpenChange,
  isBackgroundInteractive,
  classNames,
  children,
}) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={onOpenChange}
      modal={!isBackgroundInteractive}>
      <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className={"fixed inset-0 bg-[#000] opacity-[0.2]"} />
        <DialogPrimitive.Content
          onInteractOutside={(e) => isBackgroundInteractive && e.preventDefault()}
          className={cn(
            "fixed left-0 top-0 z-[999999] outline-none data-[state=closed]:animate-slideOut data-[state=open]:animate-slideIn",
            classNames?.content,
          )}>
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};
