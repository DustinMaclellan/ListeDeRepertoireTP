import { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { useTranslation } from 'react-i18next';

function FormulaireNouvelUtilisateur() {
  const { t } = useTranslation();
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
      <Card.Header as="h4">{t('creerVotreCompte')}</Card.Header>
      <Form.Group className="p-2">
        <Form.Label>{t('titre')}</Form.Label>
        <Form.Control
          type="text"
          value={nomUtilisateur}
          onChange={(event) => setNomUtilisateur(event.target.value)}
        />
      </Form.Group>
      <Form.Group className="p-2">
        <Form.Label>{t('motDePasse')}</Form.Label>
        <Form.Control
          type="password"
          value={motDePasse}
          onChange={(event) => setMotDePasse(event.target.value)}
        />
      </Form.Group>

      <Form.Group className="p-2">
        <Form.Label>{t('confirmerVotreMotDePasse')}</Form.Label>
        <Form.Control
          type="password"
          value={confirmationMdp}
          onChange={(event) => setConfirm(event.target.value)}
        />
      </Form.Group>
      <p className={toggleMdp}>{t('motDePassePasPareil')} </p>
      <Button variant="outline-success" size="lg" onClick={envoyerFormulaire}>
      {t('creerVotreCompte')}
      </Button>
      {afficherRedirection()}
    </Form>
  );
}

export default FormulaireNouvelUtilisateur;
