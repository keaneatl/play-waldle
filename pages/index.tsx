import { Box, Typography, Container } from "@mui/material";
import type { NextPage } from "next";
import styled from "@emotion/styled";
import Image from "next/image";
import poster from "../public/poster.gif";

const Home: NextPage = () => {
  return (
    <Container>
      <PosterBox>
        <Image
          src={poster}
          alt="PrehISOria - a collaboration of 31 PixelJoint artists"
          layout="fill"
          objectFit="cover"
        />
      </PosterBox>
      <Message maxWidth="lg">
        <MessageHeader variant="h3" color="text">
          Waldle #1
        </MessageHeader>
        <MessageDesc color="text">
          Find three characters in a sea of many others, inspired by the
          ultimate classic puzzle game. Can you be the fastest finder today?
        </MessageDesc>
      </Message>
    </Container>
  );
};

export default Home;

const PosterBox = styled(Box)`
  position: relative;
  height: 570px;
  overflow: hidden;
`;

const Message = styled(Box)`
  margin: 10px 0;
  padding: 0 10px;
`;

const MessageDesc = styled(Typography)`
  margin: 0 0 10px 0;
`;

const MessageHeader = styled(Typography)`
  margin: 0;
`;
