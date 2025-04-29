import { PaletteMode, alpha, createTheme } from "@mui/material";

export const breakpoints = {
  mobile: 0,
  tablet: 550,
  desktop: 1100,
};

export default (mode: PaletteMode) =>
  createTheme({
    breakpoints: {
      values: breakpoints,
    },
    typography: {
      fontFamily: ["Roboto"].join(","),
      fontSize: 14,
      H1Bold: {
        fontSize: "30px",
        fontStyle: "normal",
        fontWeight: 700,
        lineHeight: "20px",
      },
      H2SemiBold: {
        fontSize: "24px",
        fontWeight: 600,
        lineHeight: "20px",
      },
      H3SemiBold: {
        fontSize: "20px",
        fontWeight: 600,
        lineHeight: "20px",
      },
      H4Bold: {
        fontSize: "18px",
        fontWeight: 700,
        lineHeight: "20px",
      },
      H5SemiBold: {
        fontSize: "18px",
        fontWeight: 600,
        lineHeight: "20px",
      },
      B1Bold: {
        fontSize: "16px",
        fontWeight: 700,
        lineHeight: "20px",
      },
      B2SemiBold: {
        fontSize: "16px",
        fontWeight: 600,
        lineHeight: "20px",
      },
      B3Medium: {
        fontSize: "16px",
        fontWeight: 500,
        lineHeight: "20px",
      },
      B4Regular: {
        fontSize: "16px",
        fontWeight: 400,
        lineHeight: "20px",
      },
      B5Bold: {
        fontSize: "14px",
        fontWeight: 700,
        lineHeight: "20px",
      },
      B6Medium: {
        fontSize: "14px",
        fontWeight: 400,
        lineHeight: "20px",
      },
      B7Regular: {
        fontSize: "12px",
        fontWeight: 400,
        lineHeight: "12px",
      },
      B8SemiBold: {
        fontSize: "14px",
        fontWeight: 600,
        lineHeight: "20px",
      },
    },
    palette: {
      mode,
      ...(mode === "dark"
        ? {
            general: {
              primary: "#000000",
              secondary: "#222223",
              information: "#444444",
              shadow: "rgba(255,250,250, 0.2)",
            },
            icon: {
              accent: "#1FB0EE",
              secondary: "#858F9B",
              iconBackground: "#383838",
            },
            text: {
              primary: "#D9D9D9",
              secondary: "#8E8E8E",
              accent: "#1FB0EE",
              status: "1FB0EE",
            },
            input: {
              primary: "#FFFFFF",
              secondary: "#565E67",
              active: "#1FB0EE",
              disabled: "#383838",
              error: "#E90F36",
            },
            button: {
              primary: "#1FB0EE",
              primaryHover: "#80CDEE",
              primaryDisabled: alpha("#1FB0EE", 0.6),
              secondary: "#1FB0EE",
              secondaryHover: "#169BD3",
              secondaryBackground: "#000000",
            },
            other: {
              stroke: "#414141",
              underline: "#494949",
              underlineAccent: "#1FB0EE",
              shimmer:
                "linear-gradient(223.61deg, rgba(227, 229, 236, 0.3) 15.94%, rgba(200, 204, 219, 0.3) 87.64%)",
            },
          }
        : {
            general: {
              primary: "#FFFFFF",
              secondary: "#F8F9FA",
              information: "#000000",
              shadow: "rgba(0,0,0, 0.04)",
            },
            icon: {
              accent: "#1FB0EE",
              secondary: "#858F9B",
              iconBackground: "#F2F3F6",
            },
            text: {
              primary: "#000000",
              secondary: "#8E99A5",
              accent: "#1FB0EE",
              status: "#25C10C",
            },
            input: {
              primary: "#FFFFFF",
              secondary: "#ADB3C6",
              active: "#1FB0EE",
              disabled: "#F2F3F6",
              error: "#C2030E",
            },
            button: {
              primary: "#419D78",
              primaryHover: "#80CDEE",
              primaryDisabled: alpha("#1FB0EE", 0.6),
              secondary: "#1FB0EE",
              secondaryHover: "#169BD3",
              secondaryBackground: "#FFFFFF",
            },
            other: {
              stroke: "#E2E4F0",
              underline: "#E2E4F0",
              underlineAccent: "#1FB0EE",
              shimmer:
                "linear-gradient(223.61deg, rgba(227, 229, 236, 0.3) 15.94%, rgba(200, 204, 219, 0.3) 87.64%)",
            },
          }),
    },
  });
