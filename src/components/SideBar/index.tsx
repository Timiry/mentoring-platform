import { PropsWithChildren } from "react";
import { Box } from "@mui/material";

const SideBar = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Box
        sx={{
          width: "300px",
          height: "calc(100vh - 60px)", // Высота видимой части страницы за вычетом высоты хедера
          padding: "15px",
          margin: "0",
          display: "flex",
          position: "fixed",
          left: "0",
          borderRight: "1px solid #ccc",
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default SideBar;
