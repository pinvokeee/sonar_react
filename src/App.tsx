import './App.css'
import { AppToolBar } from './features/AppToolBar/AppToolBar'
import { selectedNodeContext, templatesNodeContext, useContextTemplateNode, useContextTemplateSelectedNode, useTestContext } from './context/contextTemplates';
import { TemplateSelecter } from './features/TemplateSelecter/TemplateSelecter';

export const App = () => 
{  
  const contextTemplates = useContextTemplateNode();
  const contextSelectedNode = useContextTemplateSelectedNode();

  return (
    <div className="App">
      <templatesNodeContext.Provider value={contextTemplates}>
      <selectedNodeContext.Provider value={contextSelectedNode}>
        <AppToolBar></AppToolBar>
        <TemplateSelecter></TemplateSelecter>
        </selectedNodeContext.Provider>
      </templatesNodeContext.Provider>
    </div>
  )
}

export default App;
