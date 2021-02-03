import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function AffichagePieces({ match }) {
  const id = match.params.id;
  const [pieces, setPieces] = useState({});

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
      <h1>Pieces de la demande</h1>
      <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Titre</th>
            <th>artiste</th>
            <th>categories</th>
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
        <Button variant="success">Retour</Button>
      </Link>
    </>
  );
}

export default AffichagePieces;
