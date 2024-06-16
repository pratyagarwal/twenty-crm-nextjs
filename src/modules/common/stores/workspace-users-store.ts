import { mountStoreDevtool } from "simple-zustand-devtools";
import { v4 } from "uuid";
import { createInMemoryStore } from "~lib/storage/in-memory";
import { UserAction } from "~modules/common/constants";
import { IUser, IWorkspace } from "~modules/common/types";

export interface IWorkspaceUsersStoreState {
  workspace: IWorkspace;
  users: IUser[];
}

export interface IWorkspaceUsersStoreActions {
  setUsers: (userActionData: {
    userId: string;
    action: UserAction;
    user: Partial<IUser>;
  }) => void;
  setWorkspace: (workspace: Partial<IWorkspace>) => void;
}

export const workspaceUsersStore = createInMemoryStore<
  IWorkspaceUsersStoreState,
  IWorkspaceUsersStoreActions
>({
  name: "workspace-users",
  initialState: {
    workspace: {
      id: 1,
      name: "Fiber Crm",
      profile: null,
    },
    users: [
      {
        id: v4(),
        profile: null,
        firstName: "Pratyush",
        lastName: "Agarwal",
        email: "pratyushagarwal4@gmail.com",
        password: "password",
        isAuthUser: true,
      },
    ],
  },
  actions: (set) => ({
    setUsers: (userActionData) => {
      if (userActionData.action === UserAction.ADD) {
        set((state) => {
          return { ...state, users: [...state.users, userActionData.user as IUser] };
        });
      }
      if (userActionData.action === UserAction.REMOVE && userActionData.userId) {
        set((state) => {
          return {
            ...state,
            users: state.users.filter((user) => user.id !== userActionData.userId),
          };
        });
      }
      if (userActionData.action === UserAction.EDIT && userActionData.userId) {
        set((state) => {
          const userIndex = state.users.findIndex(
            (user) => user.id === userActionData.userId,
          );
          if (userIndex !== -1) {
            state.users[userIndex] = {
              ...state.users[userIndex],
              ...userActionData.user,
            };
            return state;
          }
          return state;
        });
      }
    },
    setWorkspace: (workspace) => {
      set((state) => {
        return { ...state, workspace: { ...state.workspace, ...workspace } };
      });
    },
  }),
});

mountStoreDevtool("WorkspaceUserStore", workspaceUsersStore);
