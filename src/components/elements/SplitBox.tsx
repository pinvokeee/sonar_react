import Split from 'react-split'
import "../css/SplitBox.css";

const GutterStyle = (dimension : "width" | "height", gutterSize : number) => 
{    
    return {
        "position": "relative",
        ["z-index"]: "1",
        // [dimension == "width" ? "border-right" : "border-bottom"]: `solid 1px #edeee8`,
        [dimension == "width" ? "margin-left" : "margin-bottom"]: `-${gutterSize}px`,
        [dimension]: `${gutterSize}px`,
    }
}

const elementStyle = (dimension: "width" | "height", elementSize: number, gutterSize: number, index: number) =>
{
    return {
        [dimension]: `calc(${elementSize}%)`,
    }
}

type Props =
{
    sizes?: number[] | undefined
    gutterSize?: number | undefined,
    children: React.ReactNode,   
}

export const SplitBoxVertical = (props: Props) =>
{
    return (
        <Split style={{height: "100%", position: "relative"}} 
        direction="vertical" 
        sizes={props.sizes} 
        gutterSize={4} 
        gutterStyle={GutterStyle}
        elementStyle={elementStyle}
        >
            {props.children}
        </Split>
    );
}

export const SplitBoxHorizontal = (props: Props) =>
{
    return (
        <Split style={{display: "flex", flexDirection: "row", height: "100%", position: "relative"}}
        direction="horizontal" sizes={props.sizes} gutterSize={4} elementStyle={elementStyle} gutterStyle={GutterStyle}>
            {props.children}
        </Split>
    );
}

