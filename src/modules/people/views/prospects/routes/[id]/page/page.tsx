import { FC } from "react";

export interface IPageProps {
  id: number;
}

export const Page: FC<IPageProps> = ({ id }) => {
  return <>Prospect {id}</>;
};
