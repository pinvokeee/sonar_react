import { Box, Button, styled, useTheme } from "@mui/material";
import Divider from "@mui/material/Divider";
import { TextParser } from "../../util/textParser";
import { Highlight } from "../elements/Highlight";

const Container = styled("div")((theme) => 
(
    {
        display: "grid",
        width: "100%",
        height: "100%",
        gridTemplateRows: "minmax(0, 1fr) auto",
    }
));

const View = styled("div")(({ theme }) =>
(
    {
        textAlign: "left",
        padding: "0px 6px 6px 6px",
        overflowY: "auto",
    }
));

const Pre = styled("pre")(({theme}) =>
(
    {
        fontFamily: "inherit",
        fontSize: "inherit",
        margin: 0,
        overflowWrap: 'anywhere',
        whiteSpace: "pre-wrap",
    }
));

const Block = styled(Pre)(({ theme }) =>
(
    {
        padding: "8px",
    }
));


const BlockInfo = styled(Pre)(({ theme }) =>
(
    {
        color: theme.palette.background.default,
        backgroundColor: "#fdf9e2",
        padding: "8px",
    }
));

const ButtonSpace = styled("div")(({theme}) =>
(
    {
        // fontSize: "16pt",
        padding: "8px",
        textAlign: "right",
    }
));

type CopyBlockProp =
{
    text: string,
    keyword?: string,
}

const CopyBlock = (props: CopyBlockProp) =>
{
    const theme = useTheme();

    return <>
        <Box sx={{ border: `solid 1px ${theme.palette.divider}`, padding: "8px", position: "relative" }}>    
            {/* <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                
            </Box> */}
            <Button variant="contained" sx={{ position: "absolute", right: 8 }} onClick={ () => navigator.clipboard.writeText(props.text) }>コピー</Button>
            <Block><Highlighter text={props.text} keyword={props.keyword} /></Block>
        </Box>
    </>
}

type HtmlBlockProp =
{
    text: string,
}

const HtmlBlock = (props: HtmlBlockProp) =>
{
    return <>
    <div dangerouslySetInnerHTML={ { __html: props.text } }></div>
    </>
}


const createTextblocks = (source: string) => 
{
    const maker = "$$$$$";

    let p1 = source.indexOf(maker, 0);

    const blocks: Textblock[] = [];

    //もしマーカーが含まれていなければただのテキストブロックとして返す
    if (p1 == -1)
    {
        blocks.push({
            kind: "text",
            text: source,
        });
        
        return blocks;
    }

    //もしマーカーが含まれていれば
    while (p1 > -1)
    {
        const p2 = source.indexOf(maker, p1 + 1);
        if (p2 == -1) break;

        const text = source.slice(p1 + maker.length, p2).trim();
        p1 = source.indexOf(maker, p2 + 1);

        if (text.startsWith("赤:"))
        {
            blocks.push({
                kind: "red",
                text: text.slice(2, text.length),
            });
        }
        else if (text.startsWith("青:"))
        {
            blocks.push({
                kind: "blue",
                text: text.slice(2, text.length),
            });
        }
        else if (text.startsWith("html:"))
        {
            blocks.push({
                kind: "html",
                text: text.slice(5, text.length),
            });
        }
        else if (text.startsWith("[") && text.endsWith("]"))
        {
            blocks.push({
                kind: "copy",
                text: text.slice(1, text.length - 1),
            });
        }
        else
        {
            blocks.push({
                kind: "info",
                text,
            });
        }

        const last = p1 > -1 ? p1 : source.length;

        blocks.push({
            kind: "text",
            text: source.slice(p2 + maker.length, last).trim(),
        });
    }

    return blocks;
}

type HighlighterProps = 
{
    text: string,
    keyword?: string,
}

const Highlighter = (props: HighlighterProps) =>
{  
    console.log(props.keyword);
    if (props.keyword == undefined) return <>{props.text}</>;

    const el = TextParser.parseMatchedText(props.text, props.keyword);

    return <>{el.map(item => {
        if (item.type == "matched") return <Highlight>{item.text}</Highlight>
        return <>{item.text}</>;
    })}</>;
}

const createTemplateTextView = (blocks: Textblock[], keyword?: string) =>
{
    const elements = [];

    let pre = undefined;

    for (const block of blocks)
    {
        if (block.kind == "info") elements.push(<BlockInfo><Highlighter text={block.text} keyword={keyword}/></BlockInfo>);
        if (block.kind == "copy") elements.push(<CopyBlock text={ block.text } keyword={keyword}/>);
        if (block.kind == "text") elements.push(<Block><Highlighter text={block.text} keyword={keyword} /></Block>);
        // if (block.kind == "html") elements.push(<HtmlBlock text={ block.text }></HtmlBlock>);
        if (block.kind == "blue") elements.push(<BlockInfo sx={{ color: "blue" }}><Highlighter text={block.text} keyword={keyword} /></BlockInfo>);
        if (block.kind == "red") elements.push(<BlockInfo sx={{ color: "red" }}><Highlighter text={block.text} keyword={keyword} /></BlockInfo>);

        pre = block;
    }

    return elements;
}


type Textblock = 
{
    kind: "text" | "info" | "copy" | "html" | "red" | "blue",
    text: string, 
}

const copy = (textblocks: Textblock[]) =>
{
    const text = textblocks.filter(t => t.kind == "text" || t.kind == "copy").map(t => t.text).join("\r\n");

    navigator.clipboard.writeText(text).then(() =>
    {
        // alert("コピーしました");
    }).catch(() => 
    {
        alert("エラーが発生しました");
    });
}

type Prop = 
{
    text: string,
    keyword?: string,
}

export const TextViewer = (props: Prop) =>
{
    const textBlocks = createTextblocks(props.text);

    return <>
    <Container>
        <View>
            {createTemplateTextView(textBlocks, props.keyword)}
        </View>
        <Divider></Divider>
        <ButtonSpace>
            <Button sx={{ fontSize: "14pt", }} variant="contained" onClick={() => copy(textBlocks)}>コピー</Button>
        </ButtonSpace>
    </Container>
    </>
}