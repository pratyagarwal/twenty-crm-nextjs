"use client";

import { FC, PropsWithChildren, ReactNode, useEffect, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "~lib/utils";

export interface IDrawerProps {
  trigger: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  orientation?: "ltr" | "rtl";
  isBackgroundInteractive?: boolean;
  isEscapeKeyDisabled?: boolean;
  classNames?: {
    content: string;
  };
}

export const Drawer: FC<PropsWithChildren<IDrawerProps>> = ({
  trigger,
  open,
  onOpenChange,
  isBackgroundInteractive,
  isEscapeKeyDisabled,
  orientation = "ltr",
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
          onOpenAutoFocus={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => isEscapeKeyDisabled && e.preventDefault()}
          onInteractOutside={(e) => isBackgroundInteractive && e.preventDefault()}
          className={cn(
            orientation === "ltr"
              ? "fixed left-0 top-0 z-[999999] outline-none data-[state=closed]:animate-slideOutLtr data-[state=open]:animate-slideInLtr"
              : "fixed right-0 top-0 z-[999999] outline-none data-[state=closed]:animate-slideOutRtl data-[state=open]:animate-slideInRtl",
            classNames?.content,
          )}>
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};
