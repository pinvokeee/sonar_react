import { styled } from "@mui/material";
import { SplitBoxHorizontal } from "../../components/elements/SplitBox"
import { ViewerHeader } from "../apptoolbar";
import { SheetToolBar } from "../apptoolbar/SheetToolBar";
import { Sheet } from "../checksheet/Sheet"
import { TemplatesViewer } from "../viewer/templates/TemplatesViewer"

const SingleContainer = styled("div")(({ theme }) => 
(
  {
    display: "grid",
    height: "100%",
    gridTemplateRows: "auto minmax(0, 1fr)",
  }
));

export const MainView = () =>
{
    return (
        <SplitBoxHorizontal sizes={[15, 85]} gutterSize={6}>
            <Sheet></Sheet>            
            <SingleContainer>
                <ViewerHeader></ViewerHeader>
                <TemplatesViewer></TemplatesViewer>
            </SingleContainer>
        </SplitBoxHorizontal>
    )
}
