import { React, useState } from "react";

import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

function ListeDemandesSpeciales({
  listeDemandes,
  setListeDemandes,
  handleClick,
}) {
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
      <h1>Demandes spéciales</h1>
      <Table striped hover>
        <thead>
          <tr>
            <th>
              Nom Client{" "}
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
            <th>Pieces</th>
            <th>
              Date d'Ajout{" "}
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
            <th>Modifier État</th>
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
                        <b>Titre:</b>{" "}
                        {listeDemandes[keys].pieces[chanson].titre}
                      </li>
                      <li>
                        <b>Artiste: </b>
                        {listeDemandes[keys].pieces[chanson].artiste}
                      </li>
                      <li>
                        <b>Categories:</b>{" "}
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
                      Rendre inactive
                    </Button>
                  ) : (
                    <h4>Demande inactive</h4>
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
