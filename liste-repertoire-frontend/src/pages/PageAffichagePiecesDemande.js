import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';


function AffichagePieces({ match }) {
  const id = match.params.id;
  const [pieces, setPieces] = useState({});
  const { t } = useTranslation();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const chercherDemandes = async () => {
      const resultat = await fetch(`/api/demandes/historique/${id}`);
      const body = await resultat.json().catch((error) => {
        console.log(error);
      });

      setPieces(body);
    };
    chercherDemandes();
  }, []);

  return (
    <>
      <h1>{t('piecesDeLaDemande')}</h1>
      <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>{t('titre')}</th>
            <th>{t('artiste')}</th>
            <th>{t('categorie')}</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(pieces).map((piece) => (
            <tr>
              <td>{piece.titre}</td>
              <td>{piece.artiste}</td>
              <td>
                {piece.categories.map((categorie, index) => {
                  if (index === piece.categories.length - 1) {
                    return <>{categorie}</>;
                  } else {
                    return <>{categorie} - </>;
                  }
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Link to="/afficherHistorique">
        <Button variant="success">{t('retour')}</Button>
      </Link>
    </>
  );
}

export default AffichagePieces;
