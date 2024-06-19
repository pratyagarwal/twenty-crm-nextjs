import {
  BuildingIcon,
  CalendarIcon,
  CubeIcon,
  EmailIcon,
  LinkedinIcon,
  MapIcon,
  PhoneIcon,
  SuitcaseIcon,
  UserIcon,
} from "~lib/assets";

export const getFilterIconByName = (name: string) => {
  switch (name) {
    case "name":
      return UserIcon;
    case "company":
      return BuildingIcon;
    case "email":
      return EmailIcon;
    case "phone":
      return PhoneIcon;
    case "createdAt":
      return CalendarIcon;
    case "city":
      return MapIcon;
    case "jobTitle":
      return SuitcaseIcon;
    case "linkedin":
      return LinkedinIcon;
    default:
      return CubeIcon;
  }
};
