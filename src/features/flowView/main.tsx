import { Box, styled } from "@mui/material"
import React, { useCallback, useState } from "react"

const flows : FlowPart[] = [
{
    id: 0,
    text: "フロー開始dddddddddddddddddddddddddddddddddddddddawdwa",
    children:
    [
        {
            id: 1,
            text: "test1-child1",
            children: [
                {
                    id: 3,
                    text: "test1-child1-child1",
                    children: []
                },

                {
                    id: 3,
                    text: "test1-child1-child2",
                    children: []
                },

                {
                    id: 3,
                    text: "test1-child1-child3",
                    children: [
                        {
                            id: 4,
                            text: "test1-child1-child3-child1",
                            children: []
                        },

                        {
                            id: 4,
                            text: "これはテストですか",
                            children: []
                        }
                    ]
                },
            ]
        },

        {
            id: 2,
            text: "test1-child2",
            children: [
                {
                    id: 3,
                    text: "test1-child2-child1",
                    children: []
                },

                {
                    id: 3,
                    text: "test1-child2-child2",
                    children: []
                },
            ]
        }
    ]
},

{
    id: 0,
    text: "フロー開始dddddddddddddddddddddddddddddddddddddddawdwa",
    children:
    [
        {
            id: 1,
            text: "test2-child1",
            children: [
                {
                    id: 3,
                    text: "test2-child-child1",
                    children: []
                },
            ]
        },

        {
            id: 2,
            text: "test2-child2",
            children: []
        }
    ]
}
]

type FlowPart = 
{
    id: number,
    text: string,
    children: FlowPart[],
}

const CardSpacer = styled("div")(({theme})=>
(
    {
        margin: "0 12px 0 12px" 
    }
));

const TextCard = styled("div")(({theme})=>
(
    {
        padding: "16px 8px 16px 8px",
        border: "solid 2px gray",
        userSelect: "none",
        cursor: "pointer",
        borderRadius: "3px",
        whiteSpace: "nowrap",
    }
));


const click = (flow: FlowPart) =>
{
    console.log(flow);
}


export const FlowView = () =>
{
    const [selectedFlowPart, selectionFlowPart] = useState<FlowPart | undefined>(undefined);

    const select = useCallback((flow: FlowPart)  =>
    {
        selectionFlowPart(flow);
    }, [])    

    return <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center"}}>
        {
            flows.map(f => 
                <Flow part={f} onClick={ (ff) => select(ff) } isSelected={f == selectedFlowPart}></Flow>
            )
        }
    </Box>
}

type FlowPartProp =
{
    part: FlowPart,
    parent?: FlowPart,
    isMostLeft?: boolean,
    isMostRight?: boolean,
    isSelected?: boolean,
    onClick?: (flow: FlowPart) => void,
}

const createLeftLineBox = () =>
{
    return <>
        <Box sx={{ display: "flex", justifyContent: "flex-end", flexDirection: "row", width: "100%",  }}>
            <div style={{ width: "50%", height:"2px", backgroundColor: "gray"}}></div>   
        </Box>  
    </>
}

const createRightLineBox = () =>
{
    return <>
        <Box sx={{ display: "flex", justifyContent: "flex-start", flexDirection: "row", width: "100%",  }}>
            <div style={{ width: "calc(50% + 2px)", height:"2px", backgroundColor: "gray"}}></div>   
        </Box>
    </>
}

const createMidLineBox = () =>
{
    return <>
        <Box sx={{ display: "flex", justifyContent: "stretch", flexDirection: "row", width: "100%",  }}>
            <div style={{ flex: "1", height:"2px", backgroundColor: "gray"}}></div>   
            {/* <div style={{ flex: "1", height:"2px", backgroundColor: "gray"}}></div> */}
        </Box>
    </>
}

const Flow = (prop: FlowPartProp) =>
{
    return <React.Fragment>
        <Box >

            {   
                prop.parent != undefined ? 
                <Box sx={{ width: "100%", height: "50px"}}>  
                {   prop.isMostLeft && prop.isMostRight ? <></> :
                    prop.isMostLeft ? createLeftLineBox() : 
                        prop.isMostRight ? createRightLineBox() : createMidLineBox()  }
                <div style={{ height: "100%", width: "2px", backgroundColor: "gray", marginLeft: "calc(50%)", }}></div> 
                </Box>
                : <></>
            }

            <CardSpacer>
                <TextCard sx={{ backgroundColor: prop.isSelected ? "white" : "red" }} onClick={(e) => prop.onClick?.call(this, prop.part)}>
                    {prop.part.text}
                </TextCard>
            </CardSpacer>

            {
                prop.part.children.length > 0 ? <Box sx={{ height: "50px"}}>
                <div style={{ height: "100%", width: "2px", backgroundColor: "gray", marginLeft: "calc(50%)", }}></div>        
                </Box> : <></>
            }

            <Box  sx={{ display: "flex", flexDirection: "row", justifyContent: "center"  }}>
                {
                    prop.part.children.map((f, i) => <Flow key={f.id} part={f} parent={prop.part} isMostLeft={i == 0} isMostRight={i == prop.part.children.length - 1} onClick={prop.onClick}></Flow>)
                }
            </Box>
            
        </Box>
    </React.Fragment>
}