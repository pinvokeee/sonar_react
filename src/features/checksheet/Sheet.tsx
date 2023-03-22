import { Button, Drawer, Paper, styled } from "@mui/material";
import { useCallback, useState } from "react";
import { SheetToolBar } from "./SheetToolBar";

const SingleContainer = styled("div")(({ theme }) => 
(
  {
    display: "grid",
    height: "100%",
    gridTemplateRows: "auto minmax(0, 1fr)",
  }
));

const SizingDrawer = styled(Drawer)(({ theme }) => 
(
  {
    '& .MuiDrawer-paper': {
      position: "relative",
      zIndex: "0",
    },
  }
));

export const Sheet = () => {

  const [isOpen, setOpenState] = useState(true);

  const handleToggle = useCallback(() => {
    setOpenState(state => !state);
  }, [])

  return (
    <SizingDrawer anchor="left" sx={{position: "relative"}} open={isOpen} variant="persistent">
        <SingleContainer> 
          <SheetToolBar>
            <Button >aaa</Button>
          </SheetToolBar>
        <Paper></Paper>
      </SingleContainer>
    </SizingDrawer>
  );
}