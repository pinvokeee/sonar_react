import { styled } from "@mui/material";
import { converter } from "../../../util/converter";

type Prop = 
{
    source: string,
    path: string[],
    highlightKeyword?: string,
}

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
        height: "100%",
        // height: "calc(100% - 4px)",
        padding: 0,
        margin: 0,
        border: "none",
        // border: "solid gray 1px",
        boxSizing: "content-box",
    }
));

export const MarkdownView = (props: Prop) =>
{
    const default_style = 
`
<style>
pre
{
    font-size: inherit;
    font-family: inherit;
    margin: 0;
    padding: 0;
    display: inline-flex;
}

pre > p
{
    margin: 0;
}

.box
{
    border: gray 1px solid;
}

.p12
{
    padding: 12px;
}

.clip_title
{
    border-left: 6px solid gray;    
    padding-left: 4px;
}
</style>
`
    converter.setPath(`/${props.path.slice(0, props.path.length - 1).join("/")}`);
    const __html =  `${default_style}${converter.toMarkdown(props.source)}`;

    if (props.highlightKeyword != undefined)
    {
        console.log(converter.toDocument(__html));
    }

    return (
        <Frame style={{ backgroundColor: "white" }} sandbox="allow-same-origin allow-scripts allow-popups allow-modals" srcDoc={__html}>
        </Frame>
    );
}