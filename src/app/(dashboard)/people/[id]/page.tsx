import { FC } from "react";
import { Page as ProspectPage } from "~modules/people/views/people/routes/[id]";

interface IPageProps {
  params: {
    id: string;
  };
}

const Page: FC<IPageProps> = ({ params: { id } }) => {
  return <ProspectPage id={id} />;
};

export default Page;
