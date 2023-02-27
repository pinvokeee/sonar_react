


import './App.css'
import { Tabs, Tab, styled, Box, Container, Button, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import TabPanel from '@mui/lab/TabPanel';
import { TabContext, TabList } from '@mui/lab';
import { useMemo, useState } from 'react';

import { TemplatesViewer } from './features/viewer/templates/templatesViewer';
import { AppHeader } from './features/apptoolbar/AppToolBar';

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

  return (
    <div className="App">
        <RecoilRoot>
        <ThemeProvider theme={theme}>
        <CssBaseline />
        
            <DialogSelectRepository></DialogSelectRepository>
            <DialogLoadingRepository></DialogLoadingRepository>

            <MainContainer>
                <AppHeader></AppHeader>
                <TemplatesViewer />
            </MainContainer>
          </ThemeProvider>

        </RecoilRoot>

    </div>
  )
}

export default App;
