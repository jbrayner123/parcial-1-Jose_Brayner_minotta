import React from 'react';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';

import Login from './pages/Login';
import MainTabs from './components/MainTabs';
import DetalleVisita from './pages/DetalleVisita';
import { isAuthenticated, initStorage } from './utils/storage';

// Inicializar almacenamiento al arrancar la aplicacion
initStorage();

export default function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          {/* Ruta de Login */}
          <Route exact path="/login" component={Login} />

          {/* Rutas de las Tabs */}
          <Route
            path="/app"
            render={() => (isAuthenticated() ? <MainTabs /> : <Redirect to="/login" />)}
          />

          {/* Ruta de Detalle de Visita por ID */}
          <Route
            exact
            path="/visitas/:id"
            render={() => (isAuthenticated() ? <DetalleVisita /> : <Redirect to="/login" />)}
          />

          {/* Redireccion inicial */}
          <Route exact path="/">
            <Redirect to={isAuthenticated() ? '/app/visitas' : '/login'} />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}
