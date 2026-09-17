import React from 'react';
import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel
} from '@ionic/react';
import { Route, Redirect } from 'react-router-dom';
import { calendarOutline, peopleOutline, personOutline } from 'ionicons/icons';

import Visitas from '../pages/Visitas';
import Pacientes from '../pages/Pacientes';
import Perfil from '../pages/Perfil';

export default function MainTabs() {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/app/visitas" component={Visitas} />
        <Route exact path="/app/pacientes" component={Pacientes} />
        <Route exact path="/app/perfil" component={Perfil} />
        <Route exact path="/app">
          <Redirect to="/app/visitas" />
        </Route>
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="visitas" href="/app/visitas">
          <IonIcon icon={calendarOutline} />
          <IonLabel>Visitas</IonLabel>
        </IonTabButton>

        <IonTabButton tab="pacientes" href="/app/pacientes">
          <IonIcon icon={peopleOutline} />
          <IonLabel>Pacientes</IonLabel>
        </IonTabButton>

        <IonTabButton tab="perfil" href="/app/perfil">
          <IonIcon icon={personOutline} />
          <IonLabel>Perfil</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}
