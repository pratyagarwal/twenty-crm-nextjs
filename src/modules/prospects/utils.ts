import {
  BuildingIcon,
  CalendarIcon,
  CubeIcon,
  EmailIcon,
  LinkedinIcon,
  MapIcon,
  PhoneIcon,
  SuitcaseIcon,
  TwitterIcon,
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
    case "twitter":
      return TwitterIcon;
    default:
      return CubeIcon;
  }
};
