import { React, useState } from "react";

import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useTranslation } from 'react-i18next';

function ListeDemandesSpeciales({
  listeDemandes,
  setListeDemandes,
  handleClick,
}) {
  const { t } = useTranslation();
  const [directionTrieClient, setDirectionTrieClient] = useState("asc");
  const [directionTrieDate, setDirectionTrieDate] = useState("asc");

  function TrierAsc(champ) {
    return function (a, b) {
      if (a[champ] > b[champ]) {
        return 1;
      } else if (a[champ] < b[champ]) {
        return -1;
      }
      return 0;
    };
  }

  function TrierDesc(champ) {
    return function (a, b) {
      if (a[champ] > b[champ]) {
        return -1;
      } else if (a[champ] < b[champ]) {
        return 1;
      }
      return 0;
    };
  }

  function TrierChamp(champ, direction) {
    var listeTemp = [...listeDemandes];

    if (direction === "asc") {
      listeTemp.sort(TrierAsc(champ));
    } else {
      listeTemp.sort(TrierDesc(champ));
    }

    setListeDemandes(listeTemp);
  }
  return (
    <>
      <h1>{t('DemandesSpeciales')}</h1>
      <Table striped hover>
        <thead>
          <tr>
            <th>
            {t('nomClient')}{" "}
              <Button
                size="sm"
                variant="outline-primary"
                onClick={() => {
                  setDirectionTrieClient(
                    directionTrieClient === "asc" ? "desc" : "asc"
                  );
                  TrierChamp("nomClient", directionTrieClient);
                }}
              >
                {directionTrieClient === "asc" ? "▼" : "▲"}
              </Button>
            </th>
            <th>{t('piece')}</th>
            <th>
            {t('dateAjout')}{" "}
              <Button
                size="sm"
                variant="outline-primary"
                onClick={() => {
                  setDirectionTrieDate(
                    directionTrieDate === "asc" ? "desc" : "asc"
                  );
                  TrierChamp("dateAjout", directionTrieDate);
                }}
              >
                {directionTrieDate === "asc" ? "▼" : "▲"}
              </Button>
            </th>
            <th>{t('modifierEtat')}</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(listeDemandes).map((keys) => {
            return (
              <tr>
                <td>{listeDemandes[keys].nomClient}</td>
                <td>
                  {Object.keys(listeDemandes[keys].pieces).map((chanson) => (
                    <ul>
                      <li>
                        <b>{t('titre')}:</b>{" "}
                        {listeDemandes[keys].pieces[chanson].titre}
                      </li>
                      <li>
                        <b>{t('artiste')}: </b>
                        {listeDemandes[keys].pieces[chanson].artiste}
                      </li>
                      <li>
                        <b>{t('categorie')}:</b>{" "}
                      </li>
                      <ol>
                        {listeDemandes[keys].pieces[chanson].categories.map(
                          (element) => (
                            <li>{element}</li>
                          )
                        )}
                      </ol>
                    </ul>
                  ))}
                </td>
                <td>{listeDemandes[keys].dateAjout}</td>
                <td>
                  {" "}
                  {listeDemandes[keys].actif === 1 ? (
                    <Button
                      variant="warning"
                      onClick={() => handleClick(listeDemandes[keys]._id)}
                    >
                      {t('rendreInactif')}
                    </Button>
                  ) : (
                    <h4>{t('demandeInactif')}</h4>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default ListeDemandesSpeciales;
