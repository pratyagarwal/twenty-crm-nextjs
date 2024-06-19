import { PopoverContent } from "@radix-ui/react-popover";
import React, {
  ComponentProps,
  FC,
  MutableRefObject,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useState,
} from "react";

import * as PopoverPrimitive from "@radix-ui/react-popover";

export interface IPopoverProps {
  trigger: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  anchor?: MutableRefObject<HTMLButtonElement | HTMLDivElement | null>;
}

export const Popover: FC<
  PropsWithChildren<IPopoverProps & ComponentProps<typeof PopoverContent>>
> = ({ anchor, trigger, open, onOpenChange, children, ...rest }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [anchorRef, setAnchorRef] = useState<
    MutableRefObject<HTMLButtonElement | HTMLDivElement | null> | undefined
  >(anchor);

  useEffect(() => {
    if (!open) {
      setAnchorRef(anchor);
    }
  }, [anchor, open]);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (screenWidth < 1024 && open) {
      onOpenChange(false);
    }
  }, [open, screenWidth, onOpenChange]);

  return (
    <PopoverPrimitive.Root
      open={open}
      modal
      onOpenChange={(_open) => {
        onOpenChange(_open);
      }}>
      <PopoverPrimitive.Trigger asChild>{trigger}</PopoverPrimitive.Trigger>
      {anchor && <PopoverPrimitive.PopoverAnchor virtualRef={anchorRef} />}
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          {...rest}
          className={
            "p-[0 !important] rounded-md border border-solid border-border100 bg-bodySecondary outline-none data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=top]:animate-slideDownAndFade"
          }>
          {children}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
};
