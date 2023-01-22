import './App.css'
import * as context from './out/contextTemplates';
import { Tabs, Tab, styled, Box, Container } from '@mui/material';
import TabPanel from '@mui/lab/TabPanel';
import { TabContext, TabList } from '@mui/lab';
import { useMemo, useState } from 'react';

import { TemplatesViewer } from './features/templatesViewer/templatesViewer';
import { AppToolBar } from './features/toolbar';

import { DirectoryProvider, useDirectory } from './hooks/contextFile';
import { useTemplates } from './hooks/contextTemplates';

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

  const temHook = useTemplates();
  const dirHook = useDirectory();

  return (
    <div className="App">
      
        {/* <context.templatesNodeContext.Provider value={contextTemplates}>
        <context.selectedNodeContext.Provider value={contextSelectedNode}>
        <context.tabContext.Provider value={contextTabState}> */}

        <MainContainer>
            <AppToolBar templatesHook={temHook} dirHook={dirHook}></AppToolBar>

            {/* <TabContext value={contextTabState.current as string}> */}
            <TabContext value="template">

              {/* <TabList onChange={ (event : React.SyntheticEvent, value : string) => contextTabState.setValue(value)}> */}
              <TabList>
                <Tab label="テンプレート" value="template"/>
                <Tab label="ドキュメント" value="doc"/>
              </TabList>

              <TabPanelEx value="template">
                <TemplatesViewer />
              </TabPanelEx>

            </TabContext>

        </MainContainer>

        {/* </context.tabContext.Provider>
        </context.selectedNodeContext.Provider>
        </context.templatesNodeContext.Provider> */}

    </div>
  )
}

export default App;
