import { styled } from "@mui/material";
import { AppBar, Toolbar } from "@mui/material";

const ToolBarEx = styled(Toolbar)(({ theme }) => 
(
  {
    width: "100%",
    backgroundColor: theme.palette.common.black,
    border: "0 0 4px 0",
    borderBottom: `1px solid ${theme.palette.common.white}`,
  }
));

export const SheetToolBar = () => {
   
    return (
        <ToolBarEx variant="dense" sx={{ justifyContent: "space-between" }}>aa</ToolBarEx>
    );
}