import { React, useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function ListePiecesAdmin({ pieces, setListePieces }) {
  const [rechercheCat, setRechercheCat] = useState("");
  const [rechercheArtiste, setRechercheArtiste] = useState("");
  const [rechercheTitre, setRechercheTitre] = useState("");

  const [directionTrieTitre, setDirectionTrieTitre] = useState("asc");
  const [directionTrieArtiste, setDirectionTrieArtiste] = useState("asc");
  const [directionTrieCategorie, setDirectionTrieCategorie] = useState("asc");

  var listeTemp = [];
  console.log(pieces);

  useEffect(() => {
    pieces.forEach((element) => {
      if (element.artiste.includes(rechercheArtiste)) {
        if (element.titre.includes(rechercheTitre)) {
          if (
            Object.values(element.categories).filter((w) =>
              w.includes(rechercheCat)
            )
          ) {
            listeTemp.push(element);
          }
        }
      }
    });

    setListePieces(listeTemp);
  }, [rechercheTitre, rechercheArtiste, rechercheCat]);

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

  if (pieces?.length) {
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
            </th>
            <th></th>
          </thead>
          <tbody>
            {pieces.map((piece) => {
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
                  <td>
                    <Link to={`/modifier/${piece._id}`}>
                      <Button variant="success" className="m-1" size="sm">
                        Modifier
                      </Button>
                    </Link>
                    <Link to={`/supprimer/${piece._id}`}>
                      <Button variant="danger" className="m-1" size="sm">
                        Supprimer
                      </Button>
                    </Link>
                  </td>
                </tr>
              );
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

export default ListePiecesAdmin;
