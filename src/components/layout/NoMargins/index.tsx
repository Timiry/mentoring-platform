import { PropsWithChildren } from "react";
import Box from "@mui/material/Box";
import Header from "../Header";

const NoMarginsLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <Box
        sx={{
          padding: "60px 0 0 250px",
          margin: "0",
          display: "flex",
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default NoMarginsLayout;
