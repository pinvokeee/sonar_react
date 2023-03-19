import Split from 'react-split'
import "../css/SplitBox.css";

// const GutterStyle = (dimension : "width" | "height", gutterSize : number) => 
// {
    
//     return {
//         cursor: dimension == 'width' ?  "col-resize" : "row-resize",
//         backgroundColor: "#333a45",
//         [dimension]: gutterSize + "px",
//     }
// }

type Props =
{
    sizes?: number[] | undefined
    gutterSize?: number | undefined,
    children: React.ReactNode,   
}

export const SplitBoxVertical = (props: Props) =>
{
    return (
        <Split style={{height: "100%"}} direction="vertical" sizes={props.sizes} gutterSize={4}>
            {props.children}
        </Split>
    );
}

export const SplitBoxHorizontal = (props: Props) =>
{
    return (
        <Split style={{display: "flex", flexDirection: "row", height: "100%"}}
        direction="horizontal" sizes={props.sizes} gutterSize={4}>
            {props.children}
        </Split>
    );
}

