import styled from "@emotion/styled";
import { TooltipProps, Tooltip, tooltipClasses } from "@mui/material";

export const MuiTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#2D3047",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    minWidth: "100px",
    maxWidth: "250px",
    backgroundColor: "#2D3047",
    padding: "16px",
    borderRadius: "9px",
    fontSize: "14px",
  },
}));
