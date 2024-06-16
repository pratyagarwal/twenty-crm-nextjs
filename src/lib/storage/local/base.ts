import { StoreApi, create } from "zustand";
import { PersistOptions, createJSONStorage, persist } from "zustand/middleware";
import { Mutate } from "zustand/vanilla";

export interface IBaseActions<T extends object, K extends object> {
  reset: () => void;
  setState: (data: Partial<StateActionComposite<T, K>>, cb?: () => void) => void;
}

export type Get<T, K, F> = K extends keyof T ? T[K] : F;

export type StateActionComposite<T extends object, K extends object> = T &
  K &
  IBaseActions<T, K>;

export interface ICreateLocalStoreProps<T extends object, K extends object = object> {
  name: string;
  initialState: T;
  actions?: (
    set: Get<
      Mutate<StoreApi<StateActionComposite<T, K>>, [["zustand/persist", unknown]]>,
      "setState",
      never
    >,
    get: Get<
      Mutate<StoreApi<StateActionComposite<T, K>>, [["zustand/persist", unknown]]>,
      "getState",
      never
    >,
    store: StoreApi<StateActionComposite<T, K>>,
  ) => K;
  additionalOptions?: Omit<
    PersistOptions<StateActionComposite<T, K>, StateActionComposite<T, K>>,
    "name" | "storage"
  >;
}

export const createLocalStore = <T extends object, K extends object = object>({
  name,
  initialState,
  actions,
  additionalOptions,
}: ICreateLocalStoreProps<T, K>) => {
  return create<StateActionComposite<T, K>>()(
    persist<StateActionComposite<T, K>>(
      (set, get, store) => ({
        ...initialState,
        setState: (data, cb?) => {
          set((state) => ({ ...state, ...data }));
          cb?.();
        },
        reset: () => set({ ...initialState }),
        ...(actions ? actions(set, get, store) : ({} as K)),
      }),
      {
        name: name,
        storage: createJSONStorage(() => localStorage),
        ...(additionalOptions ? additionalOptions : {}),
      },
    ),
  );
};
