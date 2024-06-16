"use server";

import { cookies } from "next/headers";

const setThemeCookie = (theme: string) => {
  cookies().set("__theme__", theme);
};

export default setThemeCookie;
