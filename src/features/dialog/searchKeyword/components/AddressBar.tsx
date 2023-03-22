import { Button, styled, Typography } from "@mui/material"

type Props =
{
    text: string | undefined,
    onClick?: () => void,
}

const Address = styled("div")((theme) =>
(
    {
        padding: "6px",
        overflowWrap: "anywhere",
        fontSize: "11pt",
        fontWeight: "bold",
        paddingLeft: "4px",
    }
));

const Flex = styled("div")((theme) =>
(
    {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        borderBottom: "solid 1px",
    }
));

export const AddressBar = (props: Props) =>
{
    return props.text ? <Flex>
        <Address>{props.text ? `/${props.text}` : ""}</Address>
        <Button sx={{ marginLeft: "auto" }} size="small" onClick={props.onClick}>開く</Button> 
    </Flex> : <></>
}