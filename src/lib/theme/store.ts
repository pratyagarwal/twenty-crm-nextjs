import { mountStoreDevtool } from "simple-zustand-devtools";
import { createInMemoryStore } from "~lib/storage/in-memory";
import { AppTheme } from "~lib/theme/constants";

export interface ThemeStoreState {
  theme: AppTheme;
}

export interface ThemeStoreActions {
  setState: (data: Partial<ThemeStoreState>, cb?: () => void) => void;
  reset: (cb?: () => void) => void;
}

export const themeStore = createInMemoryStore<ThemeStoreState, ThemeStoreActions>({
  name: "theme",
  initialState: { theme: AppTheme.LIGHT },
});

mountStoreDevtool("ThemeStore", themeStore);
