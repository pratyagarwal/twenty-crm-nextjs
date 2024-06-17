import { mountStoreDevtool } from "simple-zustand-devtools";
import { v4 } from "uuid";
import { createInMemoryStore } from "~lib/storage/in-memory";
import { IAuthUser, IWorkspace } from "~modules/common/types";

export interface IWorkspaceUsersStoreState {
  workspace: IWorkspace;
  authUser: IAuthUser;
}

export interface IWorkspaceUsersStoreActions {
  setAuthUser: (user: Partial<IAuthUser>) => void;
  setWorkspace: (workspace: Partial<IWorkspace>) => void;
}

export const authStore = createInMemoryStore<
  IWorkspaceUsersStoreState,
  IWorkspaceUsersStoreActions
>({
  name: "auth",
  initialState: {
    workspace: {
      id: 1,
      name: "Fiber Crm",
      profile: null,
    },
    authUser: {
      id: v4(),
      profile: null,
      firstName: "Pratyush",
      lastName: "Agarwal",
      email: "pratyushagarwal4@gmail.com",
      password: "password",
    },
  },
  actions: (set) => ({
    setAuthUser: (user) => {
      set((state) => {
        return { ...state, ...user };
      });
    },
    setWorkspace: (workspace) => {
      set((state) => {
        return { ...state, workspace: { ...state.workspace, ...workspace } };
      });
    },
  }),
});

mountStoreDevtool("WorkspaceUserStore", authStore);
