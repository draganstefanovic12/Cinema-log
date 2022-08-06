import { Helmet } from "react-helmet";

interface HelmetProps {
  title: string | undefined;
}

export const HelmetTitle = ({ title }: HelmetProps) => {
  return (
    <Helmet>
      <meta
        name="title"
        content="Default Title"
        data-react-helmet="true"
      ></meta>
      <title>{title}</title>
    </Helmet>
  );
};
