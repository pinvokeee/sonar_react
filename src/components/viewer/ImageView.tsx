import { styled } from "@mui/material";

type Props = 
{
    binary: ArrayBuffer,
}

const StyledFrame = styled("div")(({theme}) =>
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
    const bytes = new Uint8Array(props.binary);
    const bin = new Array(bytes.length);
    
    bytes.forEach((b, index) => bin[index] = String.fromCharCode(b));
    
    return <>
    <StyledFrame>
        <img src={`data:image/png;base64, ${window.btoa(bin.join(""))}`}></img>
    </StyledFrame>
    </>
}