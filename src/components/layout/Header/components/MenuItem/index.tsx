import { useLocation } from "react-router-dom";
import { Link, Typography } from "@mui/material";

const MenuItem = ({ title, href }: { title: string; href: string }) => {
  const { pathname } = useLocation();

  return (
    <Link href={href} pl="20px" sx={{ textDecoration: "none" }}>
      <Typography
        variant="B1Bold"
        color={pathname === href ? "text.primary" : "text.secondary"}
      >
        {title}
      </Typography>
    </Link>
  );
};

export default MenuItem;
