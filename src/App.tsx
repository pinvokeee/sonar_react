import './App.css'
import { AppToolBar } from './features/AppToolBar/AppToolBar'
import * as context from './context/contextTemplates';
import { TemplateSelecter } from './features/TemplateSelecter/TemplateSelecter';
import { Tabs, Tab, styled, Box, Container } from '@mui/material';

export const MainContainer = styled(Box)(({ theme }) => 
(
    {
        display: "flex",
        flexDirection: "column",
        width: "100%",

        "@media screen and (max-width:600px)": 
        {
          height: "calc(100vh - 56px)",
        },

        "@media screen and (min-width:600px)": 
        {
          height: "calc(100vh - 64px)",
        },

        // height: "100vh",
        // maxHeight: "100vh",
    }
));

export const TabPanel = styled(Box)(({ theme }) => 
(
  {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%",
  }
));

export const App = () => 
{  
  const contextTemplates = context.useContextTemplateNode();
  const contextSelectedNode = context.useContextTemplateSelectedNode();

  const contextTabState = context.useContextTabState("template");

  return (
    <div className="App">
      <context.templatesNodeContext.Provider value={contextTemplates}>
      <context.selectedNodeContext.Provider value={contextSelectedNode}>
      <context.tabContext.Provider value={contextTabState}>




      <AppToolBar></AppToolBar>
      
      <MainContainer>
        <Tabs value={ contextTabState.current } onChange={ (event : React.SyntheticEvent, value : string) => contextTabState.setValue(value) }>
          <Tab label="テンプレート" value="template"/>
          <Tab label="ドキュメント" value="doc"/>
        </Tabs>   

        <TabPanel hidden={contextTabState.current == "template"}>
          <TemplateSelecter></TemplateSelecter>
        </TabPanel>     
      </MainContainer>

        {/* <MainContainer>
          <Tabs value={ contextTabState.current } onChange={ (event : React.SyntheticEvent, value : string) => contextTabState.setValue(value) }>
            <Tab label="テンプレート" value="template"/>
            <Tab label="ドキュメント" value="doc"/>
          </Tabs>

          <TabPanel hidden={contextTabState.current == "template"}>
            <TemplateSelecter></TemplateSelecter>
          </TabPanel>

          {/* <TabPanel hidden={contextTabState.current == "doc"}>

          </TabPanel> */}

          {/* <TabPanel value="template"> */}
              {/* Item One */}
          {/* </TabPanel> */}

          {/* <TabPanel value="doc"> */}
            {/* <TemplateSelecter></TemplateSelecter> */}
          {/* </TabPanel> */}

        {/*</MainContainer> */}

        </context.tabContext.Provider>
        </context.selectedNodeContext.Provider>
        </context.templatesNodeContext.Provider>
    </div>
  )
}

export default App;
