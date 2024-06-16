import { FC } from "react";
import { Page as ProspectPage } from "~modules/people/views/prospects/routes/[id]";

interface IPageProps {
  params: {
    id: number;
  };
}

const Page: FC<IPageProps> = ({ params: { id } }) => {
  return <ProspectPage id={id} />;
};

export default Page;
