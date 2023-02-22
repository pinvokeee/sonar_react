


import './App.css'
import { Tabs, Tab, styled, Box, Container } from '@mui/material';
import TabPanel from '@mui/lab/TabPanel';
import { TabContext, TabList } from '@mui/lab';
import { useMemo, useState } from 'react';

import { TemplatesViewer } from './features/viewer/templates/templatesViewer';
import { AppHeader } from './features/apptoolbar/AppToolBar';

import { useTemplates } from './hooks/contextTemplates';
import { SearchKeywordDialog } from './features/dialog/SearchKeywordDialog';
import { useSearchState } from './hooks/useSeachState';
import { atom, RecoilRoot, useRecoilValue } from 'recoil';
import { currentDirectoryState } from './recoil/atomCurrentDirectory';
import { FlowView } from './features/viewer/flow/main';
import React from 'react';
import { DialogSelectRepository } from './features/dialog/DialogSelectRepository';

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

class a
{
  test : string = "TEST";

  constructor()
  {
    // console.log("AAAA");
  }


}

export const App = () => 
{  
  return (
    <div className="App">
        <RecoilRoot>

        <DialogSelectRepository></DialogSelectRepository>

        <MainContainer>
            <AppHeader></AppHeader>
            <TemplatesViewer />
        </MainContainer>
        </RecoilRoot>
    </div>
  )
}

export default App;
