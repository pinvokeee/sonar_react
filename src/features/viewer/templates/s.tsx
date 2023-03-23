import { ThdimensionList } from "./ThdimensionList";
import { ObjectViewerWrap } from "./ObjectViewerWrap";
import { SplitBoxHorizontal } from "../../../components/elements/SplitBox";
import { Box, styled } from "@mui/material";

export const ScrollPanel = styled("div")(({ theme }) => 
(
    {
        overflow: "auto",
    }
));

export type Prop =
{
    // object: FileSystemHandleData,
}

export const TemplatesViewer = (props: Prop) =>
{
    return (
        <SplitBoxHorizontal sizes={[20, 20, 60]} gutterSize={6}>
            <ThdimensionList></ThdimensionList>
            <Box>
                <ObjectViewerWrap></ObjectViewerWrap>
            </Box>
        </SplitBoxHorizontal>
    );
}
