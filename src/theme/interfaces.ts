import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true; // adds the `mobile` breakpoint
    tablet: true;
    desktop: true;
  }
}

declare module "@mui/material/styles" {
  interface TypeText {
    primary: string;
    secondary: string;
    accent: string;
    status: string;
  }

  interface Palette {
    general: {
      primary: string;
      secondary: string;
      information: string;
      shadow: string;
    };
    icon: {
      accent: string;
      secondary: string;
      iconBackground: string;
    };
    input: {
      primary: string;
      secondary: string;
      active: string;
      disabled: string;
      error: string;
    };
    button: {
      primary: string;
      primaryHover: string;
      primaryDisabled: string;
      secondary: string;
      secondaryHover: string;
      secondaryBackground: string;
    };
    other: {
      stroke: string;
      underline: string;
      underlineAccent: string;
      shimmer: string;
      progressBar: string;
    };
  }

  interface PaletteOptions {
    general: {
      primary: string;
      secondary: string;
      information: string;
      shadow: string;
    };
    icon: {
      accent: string;
      secondary: string;
      iconBackground: string;
    };
    input: {
      primary: string;
      secondary: string;
      active: string;
      disabled: string;
      error: string;
    };
    button: {
      primary: string;
      primaryHover: string;
      primaryDisabled: string;
      secondary: string;
      secondaryHover: string;
      secondaryBackground: string;
    };
    other: {
      stroke: string;
      underline: string;
      underlineAccent: string;
      shimmer: string;
    };
  }

  interface TypographyVariants {
    H1Bold: React.CSSProperties;
    H2SemiBold: React.CSSProperties;
    H3SemiBold: React.CSSProperties;
    H4Bold: React.CSSProperties;
    H5SemiBold: React.CSSProperties;

    B1Bold: React.CSSProperties;
    B2SemiBold: React.CSSProperties;
    B3Medium: React.CSSProperties;
    B4Regular: React.CSSProperties;
    B5Bold: React.CSSProperties;
    B6Medium: React.CSSProperties;
    B7Regular: React.CSSProperties;
    B8SemiBold: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    H1Bold?: React.CSSProperties;
    H2SemiBold: React.CSSProperties;
    H3SemiBold: React.CSSProperties;
    H4Bold?: React.CSSProperties;
    H5SemiBold: React.CSSProperties;

    B1Bold?: React.CSSProperties;
    B2SemiBold?: React.CSSProperties;
    B3Medium?: React.CSSProperties;
    B4Regular?: React.CSSProperties;
    B5Bold?: React.CSSProperties;
    B6Medium?: React.CSSProperties;
    B7Regular?: React.CSSProperties;
    B8SemiBold?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    H1Bold: true;
    H2SemiBold: true;
    H3SemiBold: true;
    H4Bold: true;
    H5SemiBold: true;

    B1Bold: true;
    B2SemiBold: true;
    B3Medium: true;
    B4Regular: true;
    B5Bold: true;
    B6Medium: true;
    B7Regular: true;
    B8SemiBold: true;
  }
}
