import { styled } from "@mui/material";

type Props = 
{
    binary: ArrayBuffer,
}

const Frame = styled("iframe")(({theme}) =>
(
    {
        // display: "flex",
        alignItems: "center",
        width: "100%",
        height: "100%",
        border: "none",
        overflow: "auto",
        // justifyContent: "center",
    }
));

export const ImageView = (props: Props) =>
{
    // const bytes = new Uint8Array(props.binary);
    // const bin = new Array(bytes.length);
    // bytes.forEach((b, index) => bin[index] = String.fromCharCode(b));

    const bytes = new Uint8Array(props.binary);
    const blob = new Blob([bytes.buffer], { type: "image/png" });
    const url = window.URL.createObjectURL(blob);
    
    const onload = () => {}
    // const onload = () => window.URL.revokeObjectURL(url); 
    
    return <>
    <Frame src={url}>
        {/* <img src={url} onLoad={onload} onError={onload}></img> */}
        {/* <img src={`data:image/png;base64, ${window.btoa(bin.join(""))}`}></img> */}
    </Frame>
    </>
}