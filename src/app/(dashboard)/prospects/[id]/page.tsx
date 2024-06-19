import { FC } from "react";
import { Page as ProspectPage } from "~modules/prospects/views/prospects/routes/[id]";

interface IPageProps {
  params: {
    id: string;
  };
}

const Page: FC<IPageProps> = ({ params: { id } }) => {
  return <ProspectPage id={id} />;
};

export default Page;
