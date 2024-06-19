import React, { ComponentProps } from "react";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

import { CheckIcon } from "~lib/assets";

export type CheckboxProps = ComponentProps<typeof CheckboxPrimitive.Root> & {
  checked: boolean;
  setChecked: (value: boolean) => void;
};

export const Checkbox: React.FC<CheckboxProps> = ({ checked, setChecked, ...rest }) => {
  return (
    <CheckboxPrimitive.Root
      {...rest}
      checked={checked}
      onCheckedChange={setChecked}
      className={
        "flex h-[16px] w-[16px] items-center justify-center rounded border border-solid border-border100 bg-transparent data-[state=checked]:bg-[#1961ED] data-[state=indeterminate]:bg-transparent"
      }>
      <CheckIcon color={checked ? "#FFF" : "transparent"} size={"14px"} />
    </CheckboxPrimitive.Root>
  );
};
