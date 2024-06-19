import dayjs from "dayjs";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { v4 } from "uuid";
import { createInMemoryStore } from "~lib/storage/in-memory";
import { ITask } from "~modules/tasks/types";

export interface ITaskStoreState {
  tasks: ITask[];
  activeTaskId: string | null;
}

export interface ITaskStoreActions {
  addTask: (task: Partial<ITask>) => string;
  updateTask: (taskId: string, updatedTask: Partial<ITask>) => void;
  deleteTask: (taskId: string) => void;
}

export const taskStore = createInMemoryStore<ITaskStoreState, ITaskStoreActions>({
  name: "tasks",
  initialState: {
    tasks: [],
    activeTaskId: null,
  },
  actions: (set) => ({
    addTask: (task) => {
      const taskId = v4();
      set((state) => {
        const newState = { ...state };
        newState.tasks = [
          ...newState.tasks,
          {
            id: taskId,
            name: "",
            prospectId: "",
            dueDateTime: "",
            createdAt: dayjs().format(),
            isCompleted: false,
            notes: "",
            ...task,
          },
        ];
        return newState;
      });
      return taskId;
    },
    updateTask: (taskId, updatedTask) => {
      set((state) => {
        const taskIndex = state.tasks.findIndex((task) => task.id === taskId);
        if (taskIndex !== -1) {
          const newState = { ...state };
          newState.tasks = [...newState.tasks];
          newState.tasks[taskIndex] = { ...newState.tasks[taskIndex], ...updatedTask };
          return newState;
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
