import { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { Redirect } from "react-router-dom";

function FormulaireNouvelUtilisateur() {
  const [nomUtilisateur, setNomUtilisateur] = useState();
  const [motDePasse, setMotDePasse] = useState();
  const [confirmationMdp, setConfirm] = useState();
  const [toggleMdp, setToggle] = useState("d-none");
  const [rediriger, setRediriger] = useState(false);

  const envoyerFormulaire = async () => {
    if (motDePasse !== confirmationMdp) {
      setToggle("font-weight-bold ml-3 d-block text-danger");
    } else {
      setToggle("d-none");
      await fetch(`/api/utilisateur/ajouter`, {
        method: "post",
        body: JSON.stringify({ nomUtilisateur, motDePasse }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setRediriger(true);
    }
  };

  function afficherRedirection() {
    if (rediriger === true) {
      return <Redirect to="/connexion" />;
    }
  }

  return (
    <Form className="card mt-5">
      <Card.Header as="h4">Creer votre compte</Card.Header>
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

      <Form.Group className="p-2">
        <Form.Label>Confirmer votre mot de passe</Form.Label>
        <Form.Control
          type="password"
          value={confirmationMdp}
          onChange={(event) => setConfirm(event.target.value)}
        />
      </Form.Group>
      <p className={toggleMdp}> Le mot de passe n'est pas le meme </p>
      <Button variant="outline-success" size="lg" onClick={envoyerFormulaire}>
        Creer compte
      </Button>
      {afficherRedirection()}
    </Form>
  );
}

export default FormulaireNouvelUtilisateur;
