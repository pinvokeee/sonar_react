


import './App.css'
import { Tabs, Tab, styled, Box, Container, Button, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import TabPanel from '@mui/lab/TabPanel';
import { TabContext, TabList } from '@mui/lab';
import { useEffect, useMemo, useState } from 'react';

import { TemplatesViewer } from './features/viewer/templates/templatesViewer';
import { AppHeader } from './features/apptoolbar/AppToolBar';

import { useTemplates } from './hooks/contextTemplates';
import { SearchKeywordDialog } from './features/dialog/searchKeyword/SearchKeywordDialog';
import { useSearchState } from './hooks/useSeachState';
import { atom, RecoilRoot, useRecoilState, useRecoilValue } from 'recoil';
import { DialogSelectRepository } from './features/dialog/selectRepository/DialogSelectRepository';
import { DialogLoadingRepository } from './features/dialog/loadingRepository/DialogLoadingDirectory';

export const MainContainer = styled("div")(({ theme }) => 
(
    {
        display: "grid",
        width: "100%",
        height: "100vh",
        gridTemplateRows: "auto minmax(0, 1fr)",
    }
));

export const TabPanelEx = styled(TabPanel)(({ theme }) => 
(
  {
    padding: "0px",
  }
));


export const App = () => {
    
  const theme = createTheme({
    palette: {
      // mode: 'dark'
    }
  });

  const [s, ss] = useState<Map<string, string>>(new Map());
  const [refresh, setr] = useState(false);  

  console.log(refresh);

  useEffect(() =>
  {
    s.set("chinko", "testa");
    setr((r) => !r);
    ss(new Map(s));
  }, [])

  const a = () =>
  {
    s.set("aiueo", "kakikukeko");
    s.set("aiueo", "kakikukeko");
    setr((r) => !r);
    // ss(new Map(s));
  }

  return (
    <div className="App">
        <RecoilRoot>
        <ThemeProvider theme={theme}>
          <CssBaseline />
        
            {
              Array.from(s).map(([key, value]) => <div>{value}</div>)
            }

            <Button onClick={()=>a()}>AIEUO</Button>

            {/* <DialogSelectRepository></DialogSelectRepository> */}
            {/* <DialogLoadingRepository></DialogLoadingRepository> */}

            {/* <MainContainer>
                <AppHeader></AppHeader>
                <TemplatesViewer />
            </MainContainer> */}

        </ThemeProvider>

        </RecoilRoot>

    </div>
  )
}

export default App;
