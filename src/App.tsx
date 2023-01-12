import './App.css'
import { AppToolBar } from './features/AppToolBar/AppToolBar'
import * as context from './context/contextTemplates';
import { TemplateSelecter } from './features/TemplateSelecter/TemplateSelecter';
import { Tabs, Tab, styled, Box, Container } from '@mui/material';
import TabPanel from '@mui/lab/TabPanel';
import { TabContext, TabList } from '@mui/lab';
import { useMemo, useState } from 'react';

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
    console.log("AAAA");
  }


}

export const App = () => 
{  
  const aaa = useMemo(() => new a(), []);

  const contextTemplates = context.useContextTemplateNode();
  const contextSelectedNode = context.useContextTemplateSelectedNode();

  const contextTabState = context.useContextTabState("template");

  return (
    <div className="App">
      <context.templatesNodeContext.Provider value={contextTemplates}>
      <context.selectedNodeContext.Provider value={contextSelectedNode}>
      <context.tabContext.Provider value={contextTabState}>

      <MainContainer>
        <AppToolBar></AppToolBar>

        <TabContext value={contextTabState.current as string}>
          
          <TabList onChange={ (event : React.SyntheticEvent, value : string) => contextTabState.setValue(value)}>
            <Tab label="テンプレート" value="template"/>
            <Tab label="ドキュメント" value="doc"/>
          </TabList>
          
          <TabPanelEx value="template">
            <TemplateSelecter></TemplateSelecter>
          </TabPanelEx>

        </TabContext>

      </MainContainer>

      </context.tabContext.Provider>
      </context.selectedNodeContext.Provider>
      </context.templatesNodeContext.Provider>
    </div>
  )
}

export default App;
