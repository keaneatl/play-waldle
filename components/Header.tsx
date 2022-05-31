import { Button, Menu, MenuItem, styled, Typography } from "@mui/material";
import { Box, Grid } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { authentication } from "../firebase/app";
import { useAuthContext } from "./contexts/AuthContext";
import HowToPlay from "./helpers/HowToPlay";

const Header = (): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [guideIsOpen, setGuideIsOpen] = useState(false);
  const user = useAuthContext();
  const open = Boolean(anchorEl);

  const handleOpenGuide = () => {
    setGuideIsOpen(true);
    if (anchorEl) {
      setAnchorEl(null);
    }
  };

  const handleCloseGuide = () => {
    setGuideIsOpen(false);
    if (anchorEl) {
      setAnchorEl(null);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    try {
      signOut(authentication);
    } catch (error) {
      alert(
        "Sign out failed, please check your network connection or contact site developer"
      );
    }
  };

  return (
    <HeaderContainer>
      <HowToPlay open={guideIsOpen} handleClose={handleCloseGuide} />
      <Grid container sx={{ display: { xs: "none", md: "flex" } }}>
        <Grid item xs={3}>
          <Item sx={{ backgroundColor: "primary.dark" }}>
            <Link href="/">
              <a>Waldle</a>
            </Link>
          </Item>
        </Grid>
        <Grid item xs={1.8}>
          <Item>
            <Link href="/play">
              <a>PLAY</a>
            </Link>
          </Item>
        </Grid>
        <Grid item xs={1.8}>
          <NavButton onClick={handleOpenGuide} color="inherit">
            <NavButtonLabel>HOW TO PLAY</NavButtonLabel>
          </NavButton>
        </Grid>
        <Grid item xs={1.8}>
          <Item>MORE MAPS</Item>
        </Grid>
        <Grid item xs={1.8}>
          <Item>
            <a href="mailto:keanetolentinoo@gmail.com">CONTACT</a>
          </Item>
        </Grid>
        <Grid item xs={1.8}>
          {user !== null ? (
            <NavButton onClick={handleSignOut} color="inherit">
              <NavButtonLabel>SIGN OUT</NavButtonLabel>
            </NavButton>
          ) : (
            <Item>
              <Link href="/signin">
                <a>SIGN IN</a>
              </Link>
            </Item>
          )}
        </Grid>
      </Grid>

      <Grid container sx={{ display: { xs: "flex", md: "none" } }}>
        <Grid item xs={9}>
          <Item sx={{ backgroundColor: "primary.dark", textAlign: "left" }}>
            Waldle
          </Item>
        </Grid>
        <Grid item xs={3}>
          <MenuButton onClick={handleClick} color="inherit">
            Menu
          </MenuButton>
        </Grid>
      </Grid>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ display: { xs: "block", md: "none" } }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          style: {
            minWidth: 180,
            width: "25vw",
            borderRadius: 0,
          },
        }}
      >
        <MenuItem>
          <Link href="/play">
            <a>PLAY</a>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleOpenGuide}>HOW TO PLAY</MenuItem>
        <MenuItem onClick={handleClose}>MORE MAPS</MenuItem>
        <MenuItem onClick={handleClose}>
          <a href="mailto:keanetolentinoo@gmail.com">CONTACT</a>
        </MenuItem>
        {user !== null ? (
          <MenuItem>
            <Button onClick={handleSignOut} color="inherit">
              <Typography>SIGN OUT</Typography>
            </Button>
          </MenuItem>
        ) : (
          <MenuItem>
            <Link href="/signin">
              <a>SIGN IN</a>
            </Link>
          </MenuItem>
        )}
      </Menu>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled(Box)`
  flex-grow: 1;
  width: 100%;
`;

const Item = styled(Typography)(
  ({ theme }) => `
    font-weight: ${theme.typography.fontWeightBold};
    text-align: center;
    padding: 25px 10px;
    border-radius: 0px;
    border-left: 1px solid ${theme.palette.text.primary};
    border-bottom: 1px solid ${theme.palette.text.primary};
  `
);

const MenuButton = styled(Button)(
  ({ theme }) => `
    width: 100%;
    font-weight: ${theme.typography.fontWeightBold};
    text-align: center;
    padding: 24.5px 10px;
    border-radius: 0px;
    border-left: 1px solid ${theme.palette.text.primary};
    border-bottom: 1px solid ${theme.palette.text.primary};
  `
);

const NavButton = styled(MenuButton)`
  padding: 25px 10px;
`;

const NavButtonLabel = styled(Typography)(
  ({ theme }) => `
    font-weight: ${theme.typography.fontWeightBold};
  `
);
