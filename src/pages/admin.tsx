import { NextPage } from "next/types";
import { useRouter } from "next/router";
import { Button } from "@mui/material";

const Admin: NextPage = (props) => {

  const router = useRouter();

  console.log('pc status board', props);

  return (
    <>
      <Button
        onClick={() => router.push('/home')}
      >
        Home
      </Button>
    </>
  )
};

export default Admin;