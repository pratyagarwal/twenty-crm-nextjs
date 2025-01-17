export interface ITask {
  id: string;
  name: string;
  prospectId: string | null;
  dueDateTime: string | null;
  createdAt: string;
  isCompleted: boolean;
  notes: string;
}
