import { React } from "react";
import Table from "react-bootstrap/Table";

function ListePiecesDemande(listeDemandes) {
  const listeRecu = Object.values(listeDemandes);
  const listeAffichage = Object.values(listeRecu[0]);

  return (
    <>
      <br />
      <h2>Pièces sélectionnées</h2>
      <Table>
        <thead>
          <th>Titre</th>
          <th>Artiste</th>
          <th>Catégories</th>
          <th></th>
        </thead>
        <tbody>
          {listeAffichage.map((piece) => {
            return (
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
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default ListePiecesDemande;
