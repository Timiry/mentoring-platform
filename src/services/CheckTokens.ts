import { securityApi } from "../api";

const chekTokens = async () => {
  if (new Date(localStorage.refreshTokenExpiry) < new Date()){
    const tokens = await securityApi.refresh();
    localStorage.accessToken = tokens.data.accessToken;
    localStorage.refreshToken = tokens.data.refreshToken;
    localStorage.accessTokenExpiry = tokens.data.accessTokenExpiry;
    localStorage.refreshTokenExpiry = tokens.data.refreshTokenExpiry;
  }
};

export default chekTokens;