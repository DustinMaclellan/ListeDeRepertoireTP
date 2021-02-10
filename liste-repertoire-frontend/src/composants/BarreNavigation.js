import React  from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Button } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { UtiliserAuth } from "../context/auth";
import { useTranslation } from 'react-i18next';

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
      <Navbar.Brand href="/">Maison</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to="/" exact>
            <Nav.Link>Accueil</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/repertoire">
            <Nav.Link>Repertoire</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/demande-speciale">
            <Nav.Link className={authentification ? "d-block" : "d-none"}>
              Demande spéciale
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/admin">
            <Nav.Link className={authentificationAdmin ? "d-block" : "d-none"}>
              Admin
            </Nav.Link>
          </LinkContainer>
        </Nav>
        {sessionStorage.getItem('token') === 'true' || authentification || authentificationAdmin? (
          
          <LinkContainer to="/connexion">
            {t('deconnexion')}
            <Button
              className="btn btn-danger float-right"
              onClick={handleClick}
            >
              Deconnexion
            </Button>
          </LinkContainer>
          
        ) : (
          <LinkContainer to="/connexion">
            {t('connexion')}
            <Button className="btn btn-success float-right">Connexion</Button>
          </LinkContainer>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default BarreNavigation;
