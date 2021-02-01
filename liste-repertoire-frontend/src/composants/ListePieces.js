import { React, useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

function ListePieces({
  pieces,
  handleClick,
  listeDemandes,
  setListePieces,
  demandePieces,
  setDemandePieces,
}) {
  const [rechercheCat, setRechercheCat] = useState("");
  const [rechercheArtiste, setRechercheArtiste] = useState("");
  const [rechercheTitre, setRechercheTitre] = useState("");

  const [directionTrieTitre, setDirectionTrieTitre] = useState("asc");
  const [directionTrieArtiste, setDirectionTrieArtiste] = useState("asc");
  const [directionTrieCategorie, setDirectionTrieCategorie] = useState("asc");

  useEffect(() => {
    FiltrerChamp();
  }, [rechercheTitre, rechercheArtiste, rechercheCat]);

  console.log(pieces);

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

    if (champ === "categories") {
      listeTemp.forEach((piece) => {
        if (direction === "asc") {
          piece.categories.sort();
        } else {
          piece.categories.reverse();
        }
      });
    }

    if (direction === "asc") {
      listeTemp.sort(TrierAsc(champ));
    } else {
      listeTemp.sort(TrierDesc(champ));
    }

    setListePieces(listeTemp);
  }

  function FiltrerChamp() {
    var listeTemp = [];

    if (rechercheArtiste == "" && rechercheTitre == "" && rechercheCat == "") {
      setDemandePieces(!demandePieces);
    }

    pieces.forEach((piece) => {
      var titreLowerCase = piece.titre.toLowerCase();

      if (titreLowerCase.includes(rechercheTitre.toLowerCase())) {
        var artisteLowerCase = piece.artiste.toLowerCase();

        if (artisteLowerCase.includes(rechercheArtiste.toLowerCase())) {
          piece.categories.forEach((categorie) => {
            var categorieLowerCase = categorie.toLowerCase();

            if (categorieLowerCase.includes(rechercheCat.toLowerCase())) {
              listeTemp.push(piece);
            }
          });
        }
      }
    });

    setListePieces([...new Set(listeTemp)]);
  }

  function SupprimerFiltres() {
    setRechercheTitre("");
    setRechercheArtiste("");
    setRechercheCat("");
  }

  function RenduBodyTable() {
    if (pieces?.length) {
      return (
        <tbody>
          {pieces.map((piece) => {
            if (handleClick !== undefined) {
              if (listeIdDemandes.includes(piece._id)) {
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
      );
    }
  }

  function RenduRepertoireVide() {
    if (!pieces?.length) {
      return (
        <Alert variant={"info"}>
          Il n'y a pas de pièces dans le répertoire.
        </Alert>
      );
    }
  }

  if (listeDemandes !== undefined) {
    var listeIdDemandes = Object.keys(listeDemandes);
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
                setDirectionTrieTitre(
                  directionTrieTitre === "asc" ? "desc" : "asc"
                );
                TrierChamp("titre", directionTrieTitre);
              }}
            >
              {directionTrieTitre === "asc" ? "▼" : "▲"}
            </Button>
            <br />
            <input
              type="text"
              placeholder="filtre par titre"
              value={rechercheTitre}
              onChange={(e) => setRechercheTitre(e.target.value)}
            />
            <Button
              size="sm"
              variant="danger"
              onClick={() => {
                setRechercheTitre("");
              }}
            >
              Clear
            </Button>
          </th>
          <th>
            Artiste{" "}
            <Button
              size="sm"
              onClick={() => {
                setDirectionTrieArtiste(
                  directionTrieArtiste === "asc" ? "desc" : "asc"
                );
                TrierChamp("artiste", directionTrieArtiste);
              }}
            >
              {directionTrieArtiste === "asc" ? "▼" : "▲"}
            </Button>
            <br />
            <input
              type="text"
              placeholder="filtre par artiste"
              value={rechercheArtiste}
              onChange={(e) => setRechercheArtiste(e.target.value)}
            />
            <Button
              size="sm"
              variant="danger"
              onClick={() => {
                setRechercheArtiste("");
              }}
            >
              Clear
            </Button>
          </th>
          <th>
            Catégories{" "}
            <Button
              size="sm"
              onClick={() => {
                setDirectionTrieCategorie(
                  directionTrieCategorie === "asc" ? "desc" : "asc"
                );
                TrierChamp("categories", directionTrieCategorie);
              }}
            >
              {directionTrieCategorie === "asc" ? "▼" : "▲"}
            </Button>
            <br />
            <input
              type="text"
              placeholder="filtre par catégorie"
              value={rechercheCat}
              onChange={(e) => setRechercheCat(e.target.value)}
            />
            <Button
              size="sm"
              variant="danger"
              onClick={() => {
                setRechercheCat("");
              }}
            >
              Clear
            </Button>
          </th>
        </thead>
        {RenduBodyTable()}
      </Table>

      {RenduRepertoireVide()}

      <Button variant="danger" onClick={() => SupprimerFiltres()}>
        Supprimer Filtres
      </Button>
    </>
  );
}

export default ListePieces;
