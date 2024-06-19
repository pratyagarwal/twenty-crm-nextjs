import { FieldType } from "~modules/common/constants";

export interface IAuthUser {
  id: string;
  firstName: string;
  lastName: string;
  profile: File | null;
  email: string;
  password: string;
}

export interface IWorkspace {
  id: number;
  name: string;
  profile: File | null;
}

export interface IField {
  type: FieldType;
  name: string;
  value: string;
}
