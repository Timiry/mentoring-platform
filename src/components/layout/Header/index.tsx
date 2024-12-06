// import Typography from "@mui/material/Typography";
// import Link from "@mui/material/Link";
import Box from "@mui/material/Box";

import LogoImage from "../../ui/Logo";

import AdaptiveWrapper from "../AdaptiveWrapper";
import MenuItem from "./components/MenuItem/index";
import { HeaderContainer } from "./styles";
import { Button } from "@mui/material";
//import StyledLocationIcon from "./styles";

const Header = () => {
  return (
    <>
      <HeaderContainer>
        <AdaptiveWrapper>
          <Box
            height="75px"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box 
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box pt="20px" pb="10px" px="">
                <LogoImage size="60px" />
              </Box>
              {/* <Box py="">
                <Link href="/" pl="20px" sx={{ textDecoration: "none" }}>
                  <Typography variant="B1Bold" color="text.primary">
                    MentorIn
                  </Typography>
                </Link>
              </Box> */}
            </Box>
            <Box display="flex" alignItems="center">
              <MenuItem title="Главная" href="/" />
              <MenuItem title="Мессенджер" href="/messenger" />
              <MenuItem title="Профиль" href="/profile" />
              <Box pl="20px">
                <Button variant="contained" href="/login">
                  Войти
                </Button>
              </Box>
            </Box>
          </Box>
        </AdaptiveWrapper>
      </HeaderContainer>
    </>
  );
};

export default Header;
