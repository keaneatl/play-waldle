import { AppBar, styled, Typography } from "@mui/material";
import { GitHub } from "@mui/icons-material";

const Footer = (): JSX.Element => {
  return (
    <FooterAppBar>
      <Typography>
        Copyright Keane Tolentino ©{" "}
        <a href="https://github.com/keaneatl" target="_blank" rel="noreferrer">
          <GitHubIcon htmlColor="black" />
        </a>
      </Typography>
    </FooterAppBar>
  );
};

export default Footer;

const FooterAppBar = styled(AppBar)`
  box-shadow: 10px 5px 5px black;
  margin-top: auto;
  padding: 10px;
  display: inline-block;
  top: auto;
  bottom: 0;
  text-align: center;
`;

const GitHubIcon = styled(GitHub)`
  vertical-align: middle;
`;
