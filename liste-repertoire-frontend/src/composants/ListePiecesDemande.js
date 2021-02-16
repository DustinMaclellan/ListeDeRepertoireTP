import { React } from "react";
import Table from "react-bootstrap/Table";
import { useTranslation } from 'react-i18next';

function ListePiecesDemande(listeDemandes) {
  const listeRecu = Object.values(listeDemandes);
  const listeAffichage = Object.values(listeRecu[0]);
  const { t } = useTranslation();

  return (
    <>
      <br />
      <h2>{t('piecesSelectionnees')}</h2>
      <Table>
        <thead>
          <th>{t('titre')}</th>
          <th>{t('artiste')}</th>
          <th>{t('categorie')}</th>
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
