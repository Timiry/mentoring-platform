import { PropsWithChildren } from "react";

import Box from "@mui/material/Box";

import Header from "../Header";
import AdaptiveWrapper from "../AdaptiveWrapper";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <AdaptiveWrapper>
        <Box pt="70px">{children}</Box>
      </AdaptiveWrapper>
    </>
  );
};

export default MainLayout;
