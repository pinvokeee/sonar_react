import { styled } from "@mui/material";

export const Highlight = styled("mark")(({theme}) =>
(
    {
        overflowWrap: "anywhere",
        backgroundColor: theme.palette.success.light,
    }
)
)