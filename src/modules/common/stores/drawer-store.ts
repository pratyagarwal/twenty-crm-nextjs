import { mountStoreDevtool } from "simple-zustand-devtools";
import { omit } from "lodash";
import { createInMemoryStore } from "~lib/storage/in-memory";
import { DrawerId } from "~modules/common/constants";

export interface IDrawerState {
  open: boolean;
}

export interface IDrawerStoreState {
  State: Record<string, IDrawerState> | null;
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
    State: {
      [DrawerId.PRIMARY_SIDENAV]: { open: true },
      [DrawerId.SETTINGS_SIDNEAV]: { open: true },
      [DrawerId.COMMAND_PALLETE]: { open: false },
    },
  },
  actions: (set, get) => ({
    getOrCreateDrawerState: (drawerId) => {
      const existingDrawerState = get().State?.[drawerId];
      if (existingDrawerState) {
        return existingDrawerState;
      } else {
        set((state) => {
          if (state.State) {
            state.State[drawerId] = {
              open: false,
            };
          } else {
            state.State = {
              [drawerId]: {
                open: false,
              },
            };
          }
          return state;
        });
        return get().State![drawerId];
      }
    },
    removeDrawerState: (drawerId) => {
      set((state) => {
        return {
          State: omit(state.State, drawerId),
        };
      });
    },
    updateDrawerState: (drawerId, updatedDrawer) => {
      set((state) => {
        return state.State?.[drawerId]
          ? {
              State: {
                ...state.State,
                [drawerId]: {
                  ...state.State[drawerId],
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
