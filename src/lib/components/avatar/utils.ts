export const getInitials = (name?: string) => {
  if (!name) {
    return "";
  }
  let initials = "";
  (name ?? "").split(" ").forEach((word: string, index) => {
    if (index > 1) {
      return;
    }
    initials += word.charAt(0).toUpperCase();
  });
  return initials;
};

export const convertNameToColor = (name?: string) => {
  if (!name) {
    return "#33353A";
  }
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < name.length; i += 1) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};
