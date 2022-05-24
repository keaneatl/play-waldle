import { Box } from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useUserContext } from "../components/contexts/AuthContext";
import { storage } from "../firebase/app";
import { ref, getDownloadURL } from "firebase/storage";

type Props = {
  mapURL: string;
};

const Play: NextPage<Props> = ({ mapURL }) => {
  const user = useUserContext();
  const router = useRouter();

  if (!user) {
    router.push("/signin");
  }

  return (
    <Box>
      <Image src={mapURL} alt="Waldle Daily Map" layout="fill"></Image>
    </Box>
  );
};

export default Play;

export const getServerSideProps: GetServerSideProps = async () => {
  const mapRef = ref(storage, `maps/Today.jpg`);
  const url = await getDownloadURL(mapRef);
  return {
    props: {
      mapURL: url,
    },
  };
};
