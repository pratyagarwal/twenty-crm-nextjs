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
  const [anchorRef, setAnchorRef] = useState<
    MutableRefObject<HTMLButtonElement | HTMLDivElement | null> | undefined
  >(anchor);

  useEffect(() => {
    if (!open) {
      setAnchorRef(anchor);
    }
  }, [anchor, open]);

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
            "p-[0 !important] z-[2147483647] rounded-md border border-solid border-border100 bg-bodySecondary outline-none data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=top]:animate-slideDownAndFade"
          }>
          {children}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
};
