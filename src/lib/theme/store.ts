import { mountStoreDevtool } from "simple-zustand-devtools";
import { createInMemoryStore } from "~lib/storage/in-memory";
import { AppTheme } from "~lib/theme/constants";

export interface ThemeStoreState {
  theme: AppTheme;
}

export const themeStore = createInMemoryStore<ThemeStoreState>({
  name: "theme",
  initialState: { theme: AppTheme.LIGHT },
});

mountStoreDevtool("ThemeStore", themeStore);
