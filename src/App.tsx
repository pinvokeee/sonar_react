import './App.css'
import { AppToolBar } from './features/AppToolBar/AppToolBar'
import { templatesNodeContext, useContextTemplateNode, useTestContext } from './context/contextTemplates';
import { TemplateSelecter } from './features/TemplateSelecter/TemplateSelecter';

export const App = () => 
{  
  const contextTemplates = useContextTemplateNode();
  const contextA = useTestContext();

  return (
    <div className="App">
      <templatesNodeContext.Provider value={contextTemplates}>
        <AppToolBar></AppToolBar>
        <TemplateSelecter></TemplateSelecter>
      </templatesNodeContext.Provider>
    </div>
  )
}

export default App;
