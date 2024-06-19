import { mountStoreDevtool } from "simple-zustand-devtools";
import { createInMemoryStore } from "~lib/storage/in-memory";
import { ITask } from "~modules/tasks/types";

export interface ITaskStoreState {
  tasks: ITask[];
}

export interface ITaskStoreActions {
  addTask: (task: ITask) => void;
  updateTask: (taskId: string, updatedTask: Partial<ITask>) => void;
  deleteTask: (taskId: string) => void;
}

export const taskStore = createInMemoryStore<ITaskStoreState, ITaskStoreActions>({
  name: "tasks",
  initialState: {
    tasks: [],
  },
  actions: (set) => ({
    addTask: (task) => {
      set((state) => {
        state.tasks.push(task);
        return state;
      });
    },
    updateTask: (taskId, updatedTask) => {
      set((state) => {
        const taskIndex = state.tasks.findIndex((task) => task.id === taskId);

        if (taskIndex !== -1) {
          state.tasks[taskIndex] = { ...state.tasks[taskIndex], ...updatedTask };
          return state;
        }
        return state;
      });
    },
    deleteTask: (taskId) => {
      set((state) => {
        return {
          tasks: state.tasks.filter((task) => task.id !== taskId),
        };
      });
    },
  }),
});

mountStoreDevtool("TasksStore", taskStore);
