


import './App.css'
import { Tabs, Tab, styled, Box, Container, Button, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import TabPanel from '@mui/lab/TabPanel';
import { TabContext, TabList } from '@mui/lab';
import { useMemo, useState } from 'react';

import { TemplatesViewer } from './features/viewer/templates/s';
import { ViewerHeader } from './features/apptoolbar/AppToolBar';

import { atom, RecoilRoot, useRecoilState, useRecoilValue } from 'recoil';
import { DialogSelectRepository } from './features/dialog/selectRepository/DialogSelectRepository';
import { DialogLoadingRepository } from './features/dialog/loadingRepository/DialogLoadingDirectory';
import { DialogSearchFromKeyword } from './features/dialog/searchKeyword/SearchKeywordDialog';
import { MainView } from './features/main/MainView';

export const MainContainer = styled("div")(({ theme }) => 
(
    {
        // display: "grid",
        width: "100vw",
        height: "100vh",
        // gridTemplateRows: "auto minmax(0, 1fr)",
    }
));



export const TabPanelEx = styled(TabPanel)(({ theme }) => 
(
  {
    padding: "0px",
  }
));

export const AppTheme = styled("div")(({ theme }) => 
(
  {
    // scrollbarWidth: 'thin',
    // scrollbarColor: "#6969dd #e0e0e0",
    // webkit
  }
));

export const App = () => {
    
  const theme = createTheme({

    palette:
    {
      primary:
      {
        main: "#206c2f",
        // light: "#d4e8d0",
      },
      
      secondary:
      {
        main: "#526350",
        light: "#d4e8d0",
      },

      tertiary:
      {
        main: "#39656b",
      },

      background: 
      {
        default: "#fcfdf7",
        paper: "#fcfdf7",
      },

      text: 
      {
        primary: "#201a1b",
        secondary: "#514347",
      },

      success:
      {
        main: "#a6f5a8",
      },

      info:
      {
        main: "#bcebf2",
      },

      error:
      {
        main: "#ba1a1a",
      },

      divider: "#002106",

    }

    // palette: {
            
    //   background: {
    //     default: "#23272f",
    //     paper: "#23272f",
    //   },
      
    //   text: {
    //     primary:  "#ebecf0",
    //     secondary: "#f6f7f9",
    //     disabled: "#949bae",
    //   },

    //   common: {
    //     white: "#333a45",
    //     black: "#0E1625",
    //   },

    //   divider: "#343a46",
      
    //   // primary: {
    //   //   main: "#232730",
    //   // },


    // }
  });

  const theme2 = createTheme({

  });

  return (
    <AppTheme className='App'>
        <RecoilRoot>
        <ThemeProvider theme={theme}>
        <CssBaseline />
        
            <DialogSelectRepository></DialogSelectRepository>
            <DialogLoadingRepository></DialogLoadingRepository>
            <DialogSearchFromKeyword></DialogSearchFromKeyword>

            <MainContainer>
                <MainView />
            </MainContainer>

          </ThemeProvider>

        </RecoilRoot>

    </AppTheme>
  )
}

declare module '@mui/material/styles' {

  interface Palette {
    tertiary: Palette['primary'];
    
  }

  interface PaletteOptions {
    tertiary: PaletteOptions['primary'];
  }
}

export default App;

