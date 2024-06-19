import dayjs from "dayjs";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { v4 } from "uuid";
import { createInMemoryStore } from "~lib/storage/in-memory";
import { FieldType } from "~modules/common/constants";
import { IField } from "~modules/common/types";
import { Prospects } from "~modules/prospects/constants";

export interface IProspectStoreState {
  prospects: { id: string; fields: IField[] }[];
}

export interface IProspectStoreActions {
  addProspect: (name: string) => void;
  updateProspectField: (
    prospectId: string,
    fieldName: string,
    fieldValue: string,
  ) => void;
  deleteProspects: (prospectIds: string[]) => void;
}

export const prospectsStore = createInMemoryStore<
  IProspectStoreState,
  IProspectStoreActions
>({
  name: "prospects",
  initialState: {
    prospects: Prospects,
  },
  actions: (set) => ({
    addProspect: (name) => {
      console.log("prospects", name);
      set((state) => {
        const newState = { ...state };
        newState.prospects = [
          {
            id: v4(),
            fields: [
              { name: "name", type: FieldType.NAME, value: name },
              { name: "company", type: FieldType.COMPANY, value: "" },
              { name: "email", type: FieldType.EMAIL, value: "" },
              { name: "phone", type: FieldType.PHONE, value: "" },
              { name: "city", type: FieldType.STRING, value: "" },
              { name: "jobTitle", type: FieldType.STRING, value: "" },
              {
                name: "createdAt",
                type: FieldType.DATETIME,
                value: dayjs().format(),
              },
              {
                name: "linkedin",
                type: FieldType.URL,
                value: "",
              },
            ],
          },
          ...newState.prospects,
        ];
        return newState;
      });
    },
    updateProspectField: (prospectId, fieldName, fieldValue) => {
      set((state) => {
        const prospectIndex = state.prospects.findIndex(
          (prospect) => prospect.id === prospectId,
        );

        const fieldIndex = state.prospects[prospectIndex].fields.findIndex(
          (field) => field.name === fieldName,
        );

        if (prospectIndex !== -1 && fieldIndex !== -1) {
          state.prospects[prospectIndex].fields[fieldIndex].value = fieldValue;
          return state;
        }
        return state;
      });
    },
    deleteProspects: (prospectIds) => {
      set((state) => {
        return {
          prospects: state.prospects.filter(
            (prospect) => !prospectIds.includes(prospect.id),
          ),
        };
      });
    },
  }),
});

mountStoreDevtool("ProspectStore", prospectsStore);
