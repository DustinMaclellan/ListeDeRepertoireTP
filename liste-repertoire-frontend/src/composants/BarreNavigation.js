import React  from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Button } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { UtiliserAuth } from "../context/auth";
import { useTranslation } from 'react-i18next';
import Langages from './Langages';
function BarreNavigation() {
  const { authentification, authentificationAdmin } = UtiliserAuth();
  const { t } = useTranslation();

  const handleClick = () => {
    localStorage.clear();
    authentification(false);
    authentificationAdmin(false);
  };
 

  return (
    <Navbar className="navbar-dark bg-dark">
      <Navbar.Brand href="/"> {t('Maison')}</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to="/" exact>
            <Nav.Link>{t('Accueil')}</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/repertoire">
            <Nav.Link>{t('repertoire')}</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/demande-speciale">
            <Nav.Link className={authentification ? "d-block" : "d-none"}>
            {t('DemandesSpeciales')}
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/admin">
            <Nav.Link className={authentificationAdmin ? "d-block" : "d-none"}>
              Admin
            </Nav.Link>
          </LinkContainer>
        </Nav>
        <Langages/>
        {sessionStorage.getItem('token') === 'true' || authentification || authentificationAdmin? (
          <LinkContainer to="/connexion">
            <Button
              className="btn btn-danger float-right"
              onClick={handleClick}    
            >
              {t('deconnexion')}

            </Button>
          </LinkContainer>
        ) : (
          <LinkContainer to="/connexion">
            <Button className="btn btn-success float-right">
            {t('connexion')}
              </Button>
          </LinkContainer>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default BarreNavigation;
