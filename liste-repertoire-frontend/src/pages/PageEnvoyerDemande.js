import { React, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import ListePieces from "../composants/ListePieces";
import ListePiecesDemande from "../composants/ListePiecesDemande";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

function PageEnvoyerDemande() {
  const { t } = useTranslation();
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
      return <Alert variant="success">{t('demandeBienEteEnvoyer')}</Alert>;
    }
  }

  return (
    <>
      <h1>{t('envoyerUneDemandeSpeciale')}</h1>

      <ListePieces
        pieces={listePieces}
        setListePieces={setListePieces}
        handleClick={handleClickPiece}
        listeDemandes={listeDemandes}
        demandePieces={demandePieces}
        setDemandePieces={setDemandesPieces}
      />

      <ListePiecesDemande listeDemandes={listeDemandes} />

      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <Button onClick={envoyerDemande}>{t('envoyerLaDemande')}</Button>
        <Link to="/afficherHistorique">
          <Button className="ml-1" variant="success">
          {t('consulterMaListe')}
          </Button>
        </Link>
      </div>

      {afficherConfirmation()}
    </>
  );
}

export default PageEnvoyerDemande;
