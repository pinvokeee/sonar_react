


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
import { currentDirectoryState } from './recoil/atoms/atomCurrentDirectory';
import { FlowView } from './features/viewer/flow/main';

export const MainContainer = styled("div")(({ theme }) => 
(
    {
        display: "grid",
        width: "100%",
        height: "100vh",
        gridTemplateRows: "auto auto minmax(0, 1fr)",
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
  const aaa = useMemo(() => new a(), []);

  // const contextTemplates = context.useContextTemplateNode();
  // const contextSelectedNode = context.useContextTemplateSelectedNode();

  // const contextTabState = context.useContextTabState("template");

  return (
    <div className="App">
        <RecoilRoot>
        <MainContainer>
            <AppHeader></AppHeader>

            {/* <TabContext value={contextTabState.current as string}> */}
            <TabContext value="template">

              {/* <TabList onChange={ (event : React.SyntheticEvent, value : string) => contextTabState.setValue(value)}> */}
              <TabList>
                <Tab label="テンプレート" value="template"/>
                <Tab label="検索" value="doc"/>
                <Tab label="ドキュメント" value="doc"/>
              </TabList>

              <TabPanelEx value="template">
                {/* <FlowView></FlowView> */}
                <TemplatesViewer />
              </TabPanelEx>

            </TabContext>

        </MainContainer>
        </RecoilRoot>

    </div>
  )
}

export default App;
