import { NextPage } from "next/types";
import { Header, Cards } from '@/components';

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <Cards />
    </>
  );
};

export default Home;