import React from "react";

import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { convertNameToColor, getInitials } from "~lib/components/avatar/utils";
import { cn } from "~lib/utils";

interface IAvatarProps {
  src: string | null;
  alt: string;
  fallbackName?: string;
  classNames?: {
    root?: string;
    image?: string;
    fallback?: string;
  };
}

export const Avatar: React.FC<IAvatarProps> = ({
  src,
  alt,
  fallbackName,
  classNames,
}) => {
  return (
    <AvatarPrimitive.Root
      className={cn("h-[24px] w-[24px] rounded-[100%]", classNames?.root)}>
      <div className={"relative"}>
        <AvatarPrimitive.Image
          src={src ?? undefined}
          alt={alt}
          className={cn("h-[24px] w-[24px] rounded-[100%]", classNames?.image)}
        />
        <AvatarPrimitive.Fallback
          style={{
            backgroundColor: convertNameToColor(fallbackName),
          }}
          className={cn(
            "flex h-[24px] w-[24px] flex-row items-center justify-center rounded-[100%] leading-[24px] text-[#FFF]",
            classNames?.fallback,
          )}>
          {getInitials(fallbackName)}
        </AvatarPrimitive.Fallback>
      </div>
    </AvatarPrimitive.Root>
  );
};
