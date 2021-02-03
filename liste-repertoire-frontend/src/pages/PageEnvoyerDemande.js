import { React, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import ListePieces from "../composants/ListePieces";
import ListePiecesDemande from "../composants/ListePiecesDemande";
import { Link } from "react-router-dom";

function PageEnvoyerDemande() {
  const [listePieces, setListePieces] = useState([]);
  const [listeDemandes, setListeDemandes] = useState({});
  const [confirmation, setConfirmation] = useState(false);
  const [demandePieces, setDemandesPieces] = useState(false);

  useEffect(() => {
    const chercherDonnees = async () => {
      const resultat = await fetch(`/api/pieces`);
      const body = await resultat.json().catch((error) => {
        console.log(error);
      });
      setListePieces(body);
    };
    chercherDonnees();
  }, [demandePieces, listeDemandes]);

  const envoyerDemande = async () => {
    const pieces = Object.values(listeDemandes);
    const nom = sessionStorage.getItem("user");
    console.log(pieces);
    if(pieces?.length)
    {
    await fetch(`/api/demandes/ajouter`, {
      method: "put",
      body: JSON.stringify({ nom, pieces }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setConfirmation(true);
  }
    setListeDemandes({});
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
        setListePieces={setListePieces}
        handleClick={handleClickPiece}
        listeDemandes={listeDemandes}
        demandePieces={demandePieces}
        setDemandePieces={setDemandesPieces}
      />

      <ListePiecesDemande listeDemandes={listeDemandes} />

      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <Button onClick={envoyerDemande}>Envoyer la demande</Button>
        <Link to="/afficherHistorique">
          <Button className="ml-1" variant="success">
            Consulter Ma Liste
          </Button>
        </Link>
      </div>

      {afficherConfirmation()}
    </>
  );
}

export default PageEnvoyerDemande;
