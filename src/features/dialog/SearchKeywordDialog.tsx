import { Backdrop, Card, CardContent, CardHeader, styled, TextField, Typography } from "@mui/material";
import { SearchState } from "../../hooks/useSeachState";

const GrassBackdrop = styled(Backdrop)(({theme})=>
(
    {
        backgroundColor: "rgba(111, 126, 140, 0.2)",
        zIndex: 1,
        // backdropFilter: "blur(4px)"
    }
));

type Props = 
{
    searchState: SearchState,
    children: React.ReactNode
}

export const SearchKeywordDialog = (props: Props) =>
{

    return <>
    <GrassBackdrop open={true}>
    <Card>
        <CardContent>
            <TextField id="outlined-basic" label="検索" />
        </CardContent>
    </Card>
    </GrassBackdrop>
    </>
}