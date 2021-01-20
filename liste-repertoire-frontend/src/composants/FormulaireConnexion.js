import { react, useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { UtiliserAuth } from '../context/auth';

function FormulaireLogin() {

  const { setAuthentification } = UtiliserAuth();
  const [nomUtilisateur, setNomUtilisateur] = useState();
  const [motDePasse, setMotDePasse] = useState();
  const [rediriger, setRediriger] = useState();

  const validationBaseDeDonnees = async () => {
    const resultat = await fetch(`/api/utilisateur/verification`, {
        method: 'post',
        body: JSON.stringify({ nomUtilisateur,motDePasse }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    const body = await resultat.json().catch((error) => {
      console.log(error);
    });

    if (body == "true") {
      setAuthentification(true);
      setRediriger(true);
    } else {
      alert("Il n'existe pas de login");
    }
  };

  function afficherRedirection() {
    if (rediriger === true && nomUtilisateur == "admin") {
      return <Redirect to="/admin"></Redirect>;
    }

    if (rediriger === true && nomUtilisateur !== "admin") {
      return <Redirect to="/" />;
    }
  }

  return (
    <Form className="card mt-5">
      <Card.Header as="h4">Connexion</Card.Header>
      <Form.Group className="p-2">
        <Form.Label>Nom Utilisateur</Form.Label>
        <Form.Control
          type="text"
          value={nomUtilisateur}
          onChange={(event) => setNomUtilisateur(event.target.value)}
        />
      </Form.Group>
      <Form.Group className="p-2">
        <Form.Label>Mot de passe</Form.Label>
        <Form.Control
          type="password"
          value={motDePasse}
          onChange={(event) => setMotDePasse(event.target.value)}
        />
      </Form.Group>
      <Button
        variant="outline-success"
        size="lg"
        onClick={validationBaseDeDonnees}
      >
        Se connecter
      </Button>
      <a href="/creerUtilisateur">
        <Button className="mt-2" variant="outline-warning" size="lg">
          Vous n'avez pas de compte ?
        </Button>
      </a>
      {afficherRedirection()}
    </Form>
  );
}

export default FormulaireLogin;
