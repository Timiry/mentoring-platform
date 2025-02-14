import { Box, Typography } from "@mui/material";
import Header from "../../components/layout/Header";

const MainPage = () => {
  return (
    <>
      <Header />
      <Box display={"flex"}>
        <Box
          display={"flex"}
          ml={3}
          sx={{ flexDirection: "column", width: `calc(50%)` }}
          flexGrow={1}
        >
          <Typography variant="h3" mt={20}>
            Найди своего ментора
          </Typography>
          <Typography variant="h5" mt={10}>
            Пройди путь развития с наставником, который поможет тебе раскрыть
            свой потенциал
          </Typography>
        </Box>
        <img src="/main.jpg" style={{ height: `calc(100vh)` }}></img>
      </Box>
    </>
  );
};

export default MainPage;
