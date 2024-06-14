import { inter} from "~lib/fonts/base";

export const getFontFamilyClassName = (fontFamily?: string) => {
  switch (fontFamily) {
    case "inter":
      return inter.className;
    default:
      return inter.className;
  }
};
