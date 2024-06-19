import React, { ComponentProps } from "react";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

import { CheckIcon } from "~lib/assets";
import { cn } from "~lib/utils";

export type CheckboxProps = ComponentProps<typeof CheckboxPrimitive.Root> & {
  checked: boolean;
  setChecked: (value: boolean) => void;
  classNames?: {
    root: string;
  };
};

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  setChecked,
  classNames,
  ...rest
}) => {
  return (
    <CheckboxPrimitive.Root
      {...rest}
      checked={checked}
      onCheckedChange={setChecked}
      className={cn(
        "flex h-[16px] w-[16px] items-center justify-center rounded border border-solid border-border100 bg-transparent data-[state=checked]:bg-[#1961ED] data-[state=indeterminate]:bg-transparent",
        classNames?.root,
      )}>
      <CheckIcon color={checked ? "#FFF" : "transparent"} size={"14px"} />
    </CheckboxPrimitive.Root>
  );
};
