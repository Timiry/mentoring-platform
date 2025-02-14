import { CardMedia, CardMediaProps } from "@mui/material";

interface LogoImageProps extends CardMediaProps {
  size: number | string;
}

const LogoImage = ({ size, ...restProps }: LogoImageProps) => {
  return (
    <CardMedia
      component="img"
      image="/logo_with_text.png"
      height={size}
      width={size}
      {...restProps}
    />
  );
};

export default LogoImage;
