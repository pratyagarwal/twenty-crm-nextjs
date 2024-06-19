import Image from "next/image";
import { usePathname } from "next/navigation";
import { FC, useEffect, useMemo, useState } from "react";
import { cn } from "~lib/utils";
import { CompanyDropdown } from "~modules/common/components/company-dropdown";
import { Companies, DropdownId } from "~modules/common/constants";

export interface ICompanyCellProps {
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

export const CompanyCell: FC<ICompanyCellProps> = ({
  fieldName,
  fieldValue,
  prospectId,
  updateProspectField,
  isSelected = false,
}) => {
  const pathname = usePathname();
  const [selectedCompanyId, setSelectedCompanyId] = useState(
    Companies.find((company) => company.name.toLowerCase() === fieldValue.toLowerCase())
      ?.id ?? null,
  );

  const selectedCompany = useMemo(() => {
    return Companies.find((company) => company.id === selectedCompanyId);
  }, [selectedCompanyId]);

  useEffect(() => {
    updateProspectField(prospectId, fieldName, selectedCompany?.name ?? "");
  }, [
    fieldName,
    prospectId,
    selectedCompany?.name,
    selectedCompanyId,
    updateProspectField,
  ]);

  return (
    <div className={"relative"}>
      <CompanyDropdown
        dropdownId={`${DropdownId.CELL_COMPANY}-${prospectId}`}
        trigger={
          <div
            className={cn(
              "box-border flex h-[32px] min-w-[200px] items-center gap-2 p-2",
              isSelected ? "bg-activeCell" : "",
              pathname === "/prospects"
                ? "border-b border-r border-solid border-border200"
                : "",
            )}>
            {selectedCompany?.url ? (
              <Image
                src={selectedCompany.url}
                alt={selectedCompany?.name ?? ""}
                className={
                  "absolute left-[8px] top-[50%] h-[14px] w-[14px] translate-y-[-50%]"
                }
              />
            ) : null}
            <p
              className={cn(
                "line-clamp-1 max-w-[180px] overflow-hidden text-ellipsis text-wrap break-all text-[13px] text-text200",
                selectedCompany?.name ? "pl-5" : "pl-0",
              )}>
              {selectedCompany?.name ?? "-"}
            </p>
          </div>
        }
        selectedCompanyId={selectedCompanyId}
        setSelectedCompanyId={setSelectedCompanyId}
      />
    </div>
  );
};
