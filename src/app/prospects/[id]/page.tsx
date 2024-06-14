import { FC } from "react";

interface IPageProps {
  params: {
    id: number;
  };
}

const Page: FC<IPageProps> = ({ params: { id } }) => {
  return <>{`Prospect ${id}`}</>;
};

export default Page;
