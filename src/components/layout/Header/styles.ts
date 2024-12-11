import { styled } from "@mui/material";
import Box from "@mui/material/Box";

// import LocationIcon from "~/assets/icons/location.svg?react";
// import { stylesToColorSvg } from "~/theme/utils";

export const HeaderContainer = styled(Box)(({ theme }) => ({
  borderBottom: `2px solid ${theme.palette.other.stroke}`,
  // fontStyle: "oblique",
}));

export const MenuContainer = styled(Box)(({ theme }) => ({
  boxShadow: `0 4px 8px 0 ${theme.palette.general.shadow}`,
  fontStyle: "oblique",
}));
