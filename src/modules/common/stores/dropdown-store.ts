import { mountStoreDevtool } from "simple-zustand-devtools";
import { omit } from "lodash";
import { createInMemoryStore } from "~lib/storage/in-memory";

export interface IDropdownState {
  open: boolean;
}

export interface IDropdownStoreState {
  state: Record<string, IDropdownState> | null;
}

export interface IDropdownStoreActions {
  getOrCreateDropdownState: (dropdownId: string) => IDropdownState;
  removeDropdownState: (dropdownId: string) => void;
  updateDropdownState: (
    dropdownId: string,
    updatedDropdown?: Partial<IDropdownState>,
  ) => void;
}

export const dropdownStore = createInMemoryStore<
  IDropdownStoreState,
  IDropdownStoreActions
>({
  name: "",
  initialState: {
    state: null,
  },
  actions: (set, get) => ({
    getOrCreateDropdownState: (dropdownId) => {
      const existingDropdownState = get().state?.[dropdownId];
      if (existingDropdownState) {
        return existingDropdownState;
      } else {
        set((state) => {
          if (state.state) {
            state.state[dropdownId] = {
              open: false,
            };
          } else {
            state.state = {
              [dropdownId]: {
                open: false,
              },
            };
          }
          return state;
        });
        return get().state![dropdownId];
      }
    },
    removeDropdownState: (dropdownId) => {
      set((state) => {
        return {
          state: omit(state.state, dropdownId),
        };
      });
    },
    updateDropdownState: (dropdownId, updatedDropdown) => {
      set((state) => {
        return state.state?.[dropdownId]
          ? {
              state: {
                ...state.state,
                [dropdownId]: {
                  ...state.state[dropdownId],
                  ...updatedDropdown,
                },
              },
            }
          : state;
      });
    },
  }),
});

mountStoreDevtool("DropdownStore", dropdownStore);
