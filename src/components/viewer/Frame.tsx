import { styled } from "@mui/material";
import markdown from "markdown-it";

type Prop = 
{
    source: string,
}

const View = styled("div")(({theme}) =>
(
    {
        textAlign: "left",
        padding: "0px 6px 6px 6px"
    }
));

const StyledFrame = styled("iframe")(({theme}) =>
(
    {
        width: "100%",
        height: "100%",
        // height: "calc(100% - 4px)",
        padding: 0,
        margin: 0,
        border: "none",
        // border: "solid gray 1px",
        boxSizing: "content-box",
    }
));

export const Frame = (props: Prop) =>
{
    return <>
        <StyledFrame sandbox="allow-same-origin allow-scripts allow-popups allow-modals" srcDoc={props.source}>
        </StyledFrame>
    </>
}