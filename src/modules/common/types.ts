export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  profile: File | null;
  email: string;
  password: string;
  isAuthUser?: boolean;
}

export interface IWorkspace {
  id: number;
  name: string;
  profile: File | null;
}
