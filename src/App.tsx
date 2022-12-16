import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { useEffect } from 'react';
import AppRoutes from './utilities/Routes';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';


setupIonicReact();

const App: React.FC = () => {

  useEffect(() => {
    try {
      GoogleAuth.initialize();
    } catch (error) {
      console.log('TCL ->  ~ file: App.tsx:34 ~ useEffect ~ error', error);
    }
  }, []);

  return (
    <IonApp>
      <BrowserRouter>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        {AppRoutes}
      </BrowserRouter>
    </IonApp>
  );
};

export default App;
