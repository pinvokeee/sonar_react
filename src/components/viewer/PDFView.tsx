import { styled } from "@mui/material";
import { useRef } from "react";
// import "../../build/pdf.worker";
// import "../../build/pdf.sandbox";
// import "../../build/pdf";
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf';
// import


type Props = 
{
    objectUrl: string,
}

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

export const PDFView = (props: Props) => 
{
    // @ts-ignore
    const pdf = pdfjsLib;
    const url = props.objectUrl;
    

    // const blob = new Blob([bytes.buffer], { type: "application/pdf" });
    // const bytes = new Uint8Array(props.binary);
    // const blob = new Blob([bytes.buffer], { type: "application/pdf" });
    // const url = window.URL.createObjectURL(blob);

    console.log(pdf);

    const onload = () => {}
    // const onload = () => window.URL.revokeObjectURL(url); 

    // pdf.getDocument(url).promise.then(async (doc: any) =>
    // {
    //     // const firstPage = await doc.getPage(1);
    //     // console.log(await firstPage.getTextContent());
    // });

    return <Frame src={url} onLoad={onload} onError={onload}></Frame>
}