import React from "react";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

function ListePieces({ pieces, handleClick, listeDemandes, setListePieces }) {
  if (pieces?.length) {
    if (listeDemandes !== undefined) {
      var listeIdDemandes = Object.keys(listeDemandes);
    }

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
      var listeTemp = [...pieces];

      if (direction === "asc") {
        listeTemp.sort(TrierAsc(champ));
      } else {
        listeTemp.sort(TrierDesc(champ));
      }

      setListePieces(listeTemp);
    }

    return (
      <>
        <Table>
          <thead>
            <th>
              Titre{" "}
              <Button
                size="sm"
                onClick={() => {
                  TrierChamp("titre", "asc");
                }}
              >
                ▲
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  TrierChamp("titre", "desc");
                }}
              >
                ▼
              </Button>
            </th>
            <th>
              Artiste{" "}
              <Button
                size="sm"
                onClick={() => {
                  TrierChamp("artiste", "asc");
                }}
              >
                ▲
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  TrierChamp("artiste", "desc");
                }}
              >
                ▼
              </Button>
            </th>
            <th>
              Catégories{" "}
              <Button
                size="sm"
                onClick={() => {
                  TrierChamp("categories", "asc");
                }}
              >
                ▲
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  TrierChamp("categories", "desc");
                }}
              >
                ▼
              </Button>
            </th>
          </thead>
          <tbody>
            {pieces.map((piece) => {
              if (handleClick !== undefined) {
                if (listeIdDemandes.includes(piece._id)) {
                  console.log(1);
                  return (
                    <tr
                      key={piece._id}
                      onClick={() => handleClick(piece._id)}
                      className="bg-info"
                    >
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
                } else {
                  console.log(2);
                  return (
                    <tr key={piece._id} onClick={() => handleClick(piece._id)}>
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
                }
              } else {
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
              }
            })}
          </tbody>
        </Table>
      </>
    );
  } else {
    return (
      <Alert variant={"info"}>Il n'y a pas de pièces dans le répertoire.</Alert>
    );
  }
}

export default ListePieces;
