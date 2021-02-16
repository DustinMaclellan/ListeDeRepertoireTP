import { React, useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import ListePieces from "../composants/ListePieces";
import { useTranslation } from 'react-i18next';

function PageAdmin() {
  const [listePieces, setListePieces] = useState([]);
  const [demandePieces, setDemandesPieces] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const chercherDonnees = async () => {
      const resultat = await fetch(`/api/pieces`);
      const body = await resultat.json().catch((error) => {
        console.log(error);
      });
      setListePieces(body);
    };
    chercherDonnees();
  }, [demandePieces]);

  return (
    <>
      <h1>{t('pageAdmin')}</h1>

      <Link to="/ajouter">
        <Button>{t('ajouterUneNouvellePiece')}</Button>
      </Link>

      <h2>{t('listeDuRepertoire')}</h2>
      <ListePieces
        pieces={listePieces}
        setListePieces={setListePieces}
        demandePieces={demandePieces}
        setDemandePieces={setDemandesPieces}
        versionAdmin={true}
      />

      <br />
      <Link to="/liste-demandes">
        <Button>{t('voirLesDemandesSpeciales')}</Button>
      </Link>
    </>
  );
}

export default PageAdmin;
