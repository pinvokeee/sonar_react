import { styled } from "@mui/material";

type Props = 
{
    blobUrl: string,
}

const Frame = styled("iframe")(({theme}) =>
(
    {
        // display: "flex",
        width: "100%",
        height: "100%",
        border: "none",
        // justifyContent: "center",
    }
));

export const ImageView = (props: Props) =>
{
    return <img src={props.blobUrl}></img>
    // return <Frame src={props.bloUrl}></Frame>
}