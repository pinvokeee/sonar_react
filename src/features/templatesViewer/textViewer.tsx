import { Button, styled } from "@mui/material";

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

const createTextblocks = (source: string) => 
{
    const maker = "$$$$$";

    let p1 = source.indexOf(maker, 0);

    const blocks: Textblock[] = [];

    if (p1 == -1)
    {
        blocks.push({
            kind: "text",
            text: source,
        });
        
        return blocks;
    }

    while (p1 > -1)
    {
        const p2 = source.indexOf(maker, p1 + 1);
        if (p2 == -1) break;

        const text = source.slice(p1 + maker.length, p2).trim();
        p1 = source.indexOf(maker, p2 + 1);

        blocks.push({
            kind: "info",
            text,
        });

        const last = p1 > -1 ? p1 : source.length;

        blocks.push({
            kind: "text",
            text: source.slice(p2 + maker.length, last).trim(),
        });
    }

    return blocks;
}

const createTemplateTextView = (blocks: Textblock[]) =>
{
    const elements = [];

    for (const block of blocks)
    {
        if (block.kind == "info") elements.push(<BlockInfo>{block.text}</BlockInfo>);
        if (block.kind == "text") elements.push(<Block>{block.text}</Block>);

    }

    return elements;
}

type Prop = 
{
    text: string,
}

type Textblock = 
{
    kind: "text" | "info",
    text: string,
}

const copy = (textblocks: Textblock[]) =>
{
    const text = textblocks.filter(t => t.kind == "text").map(t => t.text).join("\r\n");

    navigator.clipboard.writeText(text).then(() =>
    {
        // alert("コピーしました");
    }).catch(() => 
    {
        alert("エラーが発生しました");
    });
}

export const TextViewer = (props: Prop) =>
{
    const textBlocks = createTextblocks(props.text);
    
    return <>
    <Container>
        <View>
            {createTemplateTextView(textBlocks)}
        </View>
        <ButtonSpace>
            <Button sx={{ fontSize: "14pt", }} variant="outlined" onClick={() => copy(textBlocks)}>コピー</Button>
        </ButtonSpace>
    </Container>
    </>
}