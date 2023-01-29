import { styled } from "@mui/material";
import markdown from "markdown-it";

type Prop = 
{
    source: string,
}

const md = new markdown();

const View = styled("div")(({theme}) =>
(
    {
        textAlign: "left",
        padding: "0px 6px 6px 6px"
    }
));

const Frame = styled("iframe")(({theme}) =>
(
    {
        width: "100%",
        height: "calc(100% - 4px)",
        padding: 0,
        margin: 0,
        border: "none",
    }
));

export const MarkdownView = (props: Prop) =>
{
    const __html =  md.render(props.source);

    return <>
        <Frame sandbox="" srcDoc={__html}>
        </Frame>
        {/* <View dangerouslySetInnerHTML={ { __html } }></View> */}
    </>
}