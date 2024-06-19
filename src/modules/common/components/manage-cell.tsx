import { FC } from "react";
import { FieldType } from "~modules/common/constants";
import { CompanyCell } from "~modules/common/components/company-cell";
import { DatetimeCell } from "~modules/common/components/datetime-cell";
import { EmailCell } from "~modules/common/components/email-cell";
import { NameCell } from "~modules/common/components/name-cell";
import { PhoneCell } from "~modules/common/components/phone-cell";
import { StringCell } from "~modules/common/components/string-cell";
import { UrlCell } from "~modules/common/components/url-cell";

export interface IManageCellProps {
  fieldType: string;
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

export const ManageCell: FC<IManageCellProps> = ({
  fieldType,
  fieldName,
  fieldValue,
  prospectId,
  updateProspectField,
  isSelected,
}) => {
  switch (fieldType) {
    case FieldType.EMAIL.toString():
      return (
        <EmailCell
          fieldName={fieldName}
          fieldValue={fieldValue}
          prospectId={prospectId}
          updateProspectField={updateProspectField}
          isSelected={isSelected}
        />
      );
    case FieldType.STRING.toString():
      return (
        <StringCell
          fieldName={fieldName}
          fieldValue={fieldValue}
          prospectId={prospectId}
          updateProspectField={updateProspectField}
          isSelected={isSelected}
        />
      );
    case FieldType.PHONE.toString():
      return (
        <PhoneCell
          fieldName={fieldName}
          fieldValue={fieldValue}
          prospectId={prospectId}
          updateProspectField={updateProspectField}
          isSelected={isSelected}
        />
      );
    case FieldType.URL.toString():
      return (
        <UrlCell
          fieldName={fieldName}
          fieldValue={fieldValue}
          prospectId={prospectId}
          updateProspectField={updateProspectField}
          isSelected={isSelected}
        />
      );
    case FieldType.COMPANY.toString():
      return (
        <CompanyCell
          fieldName={fieldName}
          fieldValue={fieldValue}
          prospectId={prospectId}
          updateProspectField={updateProspectField}
          isSelected={isSelected}
        />
      );
    case FieldType.DATETIME.toString():
      return (
        <DatetimeCell
          fieldName={fieldName}
          fieldValue={fieldValue}
          prospectId={prospectId}
          updateProspectField={updateProspectField}
          isSelected={isSelected}
        />
      );
    case FieldType.NAME.toString():
      return (
        <NameCell
          fieldName={fieldName}
          fieldValue={fieldValue}
          prospectId={prospectId}
          updateProspectField={updateProspectField}
          isSelected={isSelected}
        />
      );
    default:
      return <></>;
  }
};
