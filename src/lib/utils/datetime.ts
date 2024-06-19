import dayjs from "dayjs";

export const getTimeFromNow = (datetime: string | null) => {
  if (!datetime) return "-";

  const now = dayjs();
  const target = dayjs(datetime);
  const diff = now.diff(target);

  if (diff < 0) {
    return "-";
  }

  const diffInMinutes = now.diff(target, "minute");
  const diffInHours = now.diff(target, "hour");
  const diffInDays = now.diff(target, "day");
  const diffInMonths = now.diff(target, "month");
  const diffInYears = now.diff(target, "year");

  if (diffInMinutes < 1) {
    return "now";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} mins ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  } else if (diffInDays < 30) {
    return `${diffInDays} days ago`;
  } else if (diffInMonths < 12) {
    return `${diffInMonths} months ago`;
  } else {
    return `${diffInYears} years ago`;
  }
};
