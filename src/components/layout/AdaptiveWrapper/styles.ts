import { styled } from "@mui/material";
import Box from "@mui/material/Box";

export const AdaptiveWrapper = styled(Box)(({ theme }) => ({
  maxWidth: theme.breakpoints.values.desktop,
  padding: "0 24px",
  margin: "0 auto",
  [theme.breakpoints.down("mobile")]: {
    maxWidth: "100%",
  },
}));
