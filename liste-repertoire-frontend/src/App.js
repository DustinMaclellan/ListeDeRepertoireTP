import PageAccueil from "./pages/PageAccueil";
import PageRepertoire from "./pages/PageRepertoire";
import PageAdmin from "./pages/PageAdmin";
import PageAjouter from "./pages/PageAjouter";
import PageModifier from "./pages/PageModifier";
import PageSupprimer from "./pages/PageSupprimer";
import Page404 from "./pages/Page404";
import PageEnvoyerDemande from "./pages/PageEnvoyerDemande";
import AfficherHistorique from './pages/PageAfficherHistorique';
import PageListeDemandes from "./pages/PageListeDemandes";
import PageConnexion from "./pages/PageConnexion";
import PageAjoutUtlisateur from "./pages/PageAjoutUtilisateur";
import BarreNavigation from "./composants/BarreNavigation";
import { ContexteAuth } from "./context/auth";
import RoutePrivee from "./composants/RoutePrivee";
import RouteAdmin from "./composants/RouteAdmin";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState } from "react";
import { Form } from "react-bootstrap";

function App() {

  const [authentification, setAuthentification] = useState(false);
  const [authentificationAdmin, setAuthentificationAdmin] = useState(false);

  return (
    <ContexteAuth.Provider value={{authentification, authentificationAdmin,setAuthentification,setAuthentificationAdmin}}>
      <Router>
        <BarreNavigation />
        <Container>
          <Switch>
            <Route path="/" component={PageAccueil} exact />
            <Route path="/repertoire" component={PageRepertoire} />
            <RouteAdmin path="/admin" component={PageAdmin} />
            <RoutePrivee path="/demande-speciale" component={PageEnvoyerDemande} />
            <Route path="/liste-demandes" component={PageListeDemandes} />
            <Route path="/ajouter" component={PageAjouter} />
            <Route path="/afficherHistorique" component={AfficherHistorique} />
            <Route path="/modifier/:id" component={PageModifier} />
            <Route path="/supprimer/:id" component={PageSupprimer} />
            <Route path="/connexion" component={PageConnexion} />
            <Route path="/creerUtilisateur" component={PageAjoutUtlisateur} />
            <Route component={Page404} />
          </Switch>
        </Container>
      </Router>
    </ContexteAuth.Provider>
  );
}

export default App;
