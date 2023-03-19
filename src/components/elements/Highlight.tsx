import { styled } from "@mui/material";

export const Highlight = styled("span")(({theme}) =>
(
    {
        overflowWrap: "anywhere",
        backgroundColor: theme.palette.primary.light,
    }
)
)