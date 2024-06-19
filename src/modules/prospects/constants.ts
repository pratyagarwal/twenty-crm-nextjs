import { v4 } from "uuid";
import { FieldType } from "~modules/common/constants";
import { IField } from "~modules/common/types";

export const Prospects: { id: string; fields: IField[] }[] = [
  {
    id: v4(),
    fields: [
      { name: "name", type: FieldType.NAME, value: "Pratyush Agarwal" },
      { name: "company", type: FieldType.COMPANY, value: "Notion" },
      { name: "email", type: FieldType.EMAIL, value: "pratyagarwal@gmail.com" },
      { name: "phone", type: FieldType.PHONE, value: "+918334078608" },
      { name: "city", type: FieldType.STRING, value: "Berlin" },
      { name: "jobTitle", type: FieldType.STRING, value: "Baller" },
      {
        name: "createdAt",
        type: FieldType.DATETIME,
        value: "2019-06-04T08:24:54.887Z",
      },
      {
        name: "linkedin",
        type: FieldType.URL,
        value: "https://www.linkedin.com/in/pratyush-agarwal-/",
      },
    ],
  },
  {
    id: v4(),
    fields: [
      { name: "name", type: FieldType.NAME, value: "Virat Kohli" },
      { name: "company", type: FieldType.COMPANY, value: "Notion" },
      { name: "email", type: FieldType.EMAIL, value: "kohli@gmail.com" },
      { name: "phone", type: FieldType.PHONE, value: "+918334078608" },
      { name: "city", type: FieldType.STRING, value: "Berlin" },
      { name: "jobTitle", type: FieldType.STRING, value: "Baller" },
      {
        name: "createdAt",
        type: FieldType.DATETIME,
        value: "2019-06-04T08:24:54.887Z",
      },
      {
        name: "linkedin",
        type: FieldType.URL,
        value: "https://www.linkedin.com/in/pratyush-agarwal-/",
      },
    ],
  },
  {
    id: v4(),
    fields: [
      { name: "name", type: FieldType.NAME, value: "Steve Jobs" },
      { name: "company", type: FieldType.COMPANY, value: "Notion" },
      { name: "email", type: FieldType.EMAIL, value: "steve@gmail.com" },
      { name: "phone", type: FieldType.PHONE, value: "+918334078608" },
      { name: "city", type: FieldType.STRING, value: "Berlin" },
      { name: "jobTitle", type: FieldType.STRING, value: "Baller" },
      {
        name: "createdAt",
        type: FieldType.DATETIME,
        value: "2019-06-04T08:24:54.887Z",
      },
      {
        name: "linkedin",
        type: FieldType.URL,
        value: "https://www.linkedin.com/in/pratyush-agarwal-/",
      },
    ],
  },
  {
    id: v4(),
    fields: [
      { name: "name", type: FieldType.NAME, value: "Elon Musk" },
      { name: "company", type: FieldType.COMPANY, value: "Notion" },
      { name: "email", type: FieldType.EMAIL, value: "musk.elon@gmail.com" },
      { name: "phone", type: FieldType.PHONE, value: "+918334078608" },
      { name: "city", type: FieldType.STRING, value: "Berlin" },
      { name: "jobTitle", type: FieldType.STRING, value: "Baller" },
      {
        name: "createdAt",
        type: FieldType.DATETIME,
        value: "2019-06-04T08:24:54.887Z",
      },
      {
        name: "linkedin",
        type: FieldType.URL,
        value: "https://www.linkedin.com/in/pratyush-agarwal-/",
      },
    ],
  },
];
