import { styled, Box, Typography, Container } from "@mui/material";
import type { NextPage } from "next";

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
        <Message maxWidth="lg">
          <MessageHeader variant="h3" color="text" fontWeight={500}>
            Waldle #1
          </MessageHeader>
          <MessageDesc color="text" fontWeight={500}>
            Find three characters in a sea of many others, inspired by the
            ultimate classic puzzle game <i>Where is Waldo</i>. Amazing cover
            art is by{" "}
            <a href="https://pixeljoint.com/forum/forum_posts.asp?TID=27120">
              the talented people over at PixelJoint&nbsp;
            </a>
            ❤️
          </MessageDesc>
        </Message>
      </PosterBox>
    </Container>
  );
};

export default Home;

const PosterBox = styled(Box)`
  position: relative;
  height: 80vh;
  overflow: hidden;
`;

const Message = styled(Box)`
  position: relative;
  margin: 10px 0;
  padding: 0 10px;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;  
  max-width: 90%;
text-align: left;
margin: auto;
}
`;

const MessageHeader = styled(Typography)(
  ({ theme }) => `
  padding: 10px 15px 0 15px;
  border-radius: 10px 10px 0 0;
  background-color: rgba(220,220,220, 0.8);
  margin: 0;
`
);

const MessageDesc = styled(Typography)(
  ({ theme }) => `
  border-radius: 0 0 10px 10px;
  padding: 0 15px 10px 15px;
  background-color: rgba(220,220,220, 0.8);
  margin:0 0 20px 0;
`
);
