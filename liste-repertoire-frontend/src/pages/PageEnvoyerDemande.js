import { React, useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import ListePieces from "../composants/ListePieces";

function PageEnvoyerDemande() {
  const [listePieces, setListePieces] = useState([]);
  const [listeDemandes, setListeDemandes] = useState({});
  const [confirmation, setConfirmation] = useState(false);

  useEffect(() => {
    const chercherDonnees = async () => {
      const resultat = await fetch(`/api/pieces`);
      const body = await resultat.json().catch((error) => {
        console.log(error);
      });
      setListePieces(body);
    };
    chercherDonnees();
  }, []);

  const envoyerDemande = async () => {
    const pieces = Object.values(listeDemandes);
    const nom = localStorage.getItem('user');
    await fetch(`/api/demandes/ajouter`, {
      method: "put",
      body: JSON.stringify({ nom, pieces}),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setListeDemandes({});
    setConfirmation(true);
  };

  function handleClickPiece(id) {
    const nouvelleListeDemandes = {};
    Object.assign(nouvelleListeDemandes, listeDemandes);

    if (listeDemandes[id] === undefined) {
      const piece = listePieces.find((piece) => piece._id === id);
      nouvelleListeDemandes[id] = piece;
    } else {
      delete nouvelleListeDemandes[id];
    }

    setListeDemandes(nouvelleListeDemandes);
  }

  function afficherConfirmation() {
    if (confirmation === true) {
      return <Alert variant="success">La demande a bien été envoyée.</Alert>;
    }
  }

  return (
    <>
      <h1>Envoyer une demande spéciale</h1>
  

      <ListePieces
        pieces={listePieces}
        handleClick={handleClickPiece}
        listeDemandes={listeDemandes}
        setListePieces={setListePieces}
      />

      <Button onClick={envoyerDemande}>Envoyer la demande</Button>

      {afficherConfirmation()}
    </>
  );
}

export default PageEnvoyerDemande;
