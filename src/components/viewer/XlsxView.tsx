import { Button, styled } from "@mui/material";
import { useCallback } from "react";


type Props = 
{
    objectUrl: string,
}

const Frame = styled("iframe")(({theme}) =>
(
    {
        width: "100%",
        height: "100%",
        padding: 0,
        margin: 0,
        border: "none",
        boxSizing: "content-box",
    }
));


export const XlsxView = (props: Props) => 
{
    const burl = props.objectUrl;
    const url = burl.startsWith("blob:") ? burl.slice("blob:".length, burl.length) : burl;
    console.log(url);

    const handleClick = useCallback(() =>
    {
        window.open(props.objectUrl);
        // window.open(`ms-excel:ofv|u|<${props.objectUrl}>`);        
    }, []);

    return <>        
        <Button onClick={handleClick}>Excelデスクトップアプリケーションで開く</Button>
    </>;
}