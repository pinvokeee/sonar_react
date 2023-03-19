import { Paper, styled } from "@mui/material";
import { SheetToolBar } from "../apptoolbar/SheetToolBar";

const SingleContainer = styled("div")(({ theme }) => 
(
  {
    display: "grid",
    height: "100%",
    gridTemplateRows: "auto minmax(0, 1fr)",
  }
));

export const Sheet = () =>
{
    return (
    <SingleContainer>
        <SheetToolBar></SheetToolBar>
        <Paper></Paper>
    </SingleContainer>
    );
}