import { mountStoreDevtool } from "simple-zustand-devtools";
import { omit } from "lodash";
import { createInMemoryStore } from "~lib/storage/in-memory";
import { DrawerId } from "~modules/common/constants";

export interface IDrawerState {
  open: boolean;
}

export interface IDrawerStoreState {
  state: Record<string, IDrawerState> | null;
}

export interface IDrawerStoreActions {
  getOrCreateDrawerState: (drawerId: DrawerId) => IDrawerState;
  removeDrawerState: (drawerId: DrawerId) => void;
  updateDrawerState: (
    drawerId: DrawerId,
    updatedDrawer?: Partial<IDrawerState>,
  ) => void;
}

export const drawerStore = createInMemoryStore<IDrawerStoreState, IDrawerStoreActions>({
  name: "",
  initialState: {
    state: {
      [DrawerId.PRIMARY_SIDENAV]: { open: true },
      [DrawerId.SETTINGS_SIDENAV]: { open: true },
      [DrawerId.COMMAND_PALLETE]: { open: false },
    },
  },
  actions: (set, get) => ({
    getOrCreateDrawerState: (drawerId) => {
      const existingDrawerState = get().state?.[drawerId];
      if (existingDrawerState) {
        return existingDrawerState;
      } else {
        set((state) => {
          if (state.state) {
            state.state[drawerId] = {
              open: false,
            };
          } else {
            state.state = {
              [drawerId]: {
                open: false,
              },
            };
          }
          return state;
        });
        return get().state![drawerId];
      }
    },
    removeDrawerState: (drawerId) => {
      set((state) => {
        return {
          state: omit(state.state, drawerId),
        };
      });
    },
    updateDrawerState: (drawerId, updatedDrawer) => {
      set((state) => {
        return state.state?.[drawerId]
          ? {
              state: {
                ...state.state,
                [drawerId]: {
                  ...state.state[drawerId],
                  ...updatedDrawer,
                },
              },
            }
          : state;
      });
    },
  }),
});

mountStoreDevtool("DrawerStore", drawerStore);
