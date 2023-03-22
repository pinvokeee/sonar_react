import { Box, styled, SxProps, Theme } from "@mui/material";

type WindowCaseProps = 
{
    sx?: SxProps<Theme>, 
    title: string,
    children?: React.ReactNode,
}

const WindowCaseBox = styled(Box)(({theme}) =>
(
    {
        display: "grid",
        gridTemplateRows: "auto minmax(0, 1fr)",
        // border: `solid 1px ${theme.palette.divider}`,
        // borderRadius: "4px",
        height: "100%",
    }
));


const Title = styled("span")(({theme}) =>
(
    {
        fontSize: "10pt",
        padding: "4px",
        // color: theme.palette.te
        backgroundColor: theme.palette.primary.main,
        // borderBottom: `1px solid ${theme.palette.primary.dark}`,
        color: theme.palette.background.default,
    }
));

export const WindowCase = (props: WindowCaseProps) =>
{

    return (
    <WindowCaseBox >
        <Title>{props.title}</Title>
        {props.children}
    </WindowCaseBox>);
}
