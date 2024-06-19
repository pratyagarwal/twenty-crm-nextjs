import { useRouter } from "next/navigation";
import { FC } from "react";
import { Avatar } from "~lib/components/avatar";
import { cn } from "~lib/utils";

export interface INameCellProps {
  fieldName: string;
  fieldValue: string;
  prospectId: string;
  updateProspectField: (
    prospectId: string,
    fieldName: string,
    fieldValue: string,
  ) => void;
  isSelected?: boolean;
}

export const NameCell: FC<INameCellProps> = ({
  fieldValue,
  prospectId,
  isSelected = false,
}) => {
  const router = useRouter();

  return (
    <div
      className={"hover relative"}
      onClick={() => {
        router.push(`/prospects/${prospectId}`);
      }}>
      <div
        className={cn(
          "box-border flex h-[32px] min-w-[200px] cursor-pointer flex-row items-center border-b border-r border-solid border-border200 p-2",
          isSelected ? "bg-activeCell" : "",
        )}>
        <div
          className={
            "relative flex h-[20px] flex-row items-center gap-1 rounded bg-bgHover100 p-1 opacity-80 hover:opacity-100"
          }>
          <Avatar
            src={null}
            alt={fieldValue}
            fallbackName={fieldValue}
            classNames={{
              root: "absolute top-[75%] left-[4px] translate-y-[-50%]",
              fallback: "w-[14px] h-[14px] leading-[14px] text-[7px] rounded-[50%]",
            }}
          />
          <p
            className={
              "line-clamp-1 max-w-[180px] overflow-hidden text-ellipsis text-wrap break-all pl-5 text-[13px] text-text200"
            }>
            {fieldValue}
          </p>
        </div>
      </div>
    </div>
  );
};
