import { GetServerSideProps } from "next";

const Index = () => {
  return null;
};

export default Index;

export const getServerSideProps: GetServerSideProps = async () => {
  const destination = "/dashboard";
  return {
    redirect: {
      permanent: false,
      destination,
    },
  };
};
