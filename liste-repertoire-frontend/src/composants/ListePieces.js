import { React, useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

function ListePieces({
  pieces,
  handleClick,
  listeDemandes,
  setListePieces,
  demandePieces,
  setDemandePieces,
  versionAdmin,
}) {
  const { t } = useTranslation();
  const [rechercheCat, setRechercheCat] = useState("");
  const [rechercheArtiste, setRechercheArtiste] = useState("");
  const [rechercheTitre, setRechercheTitre] = useState("");

  const [directionTrieTitre, setDirectionTrieTitre] = useState("asc");
  const [directionTrieArtiste, setDirectionTrieArtiste] = useState("asc");
  const [directionTrieCategorie, setDirectionTrieCategorie] = useState("asc");

  useEffect(() => {
    FiltrerChamp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  function FiltrerChamp() {
    var listeTemp = [];

    if (rechercheArtiste === "" && rechercheTitre === "" && rechercheCat === "") {
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

  const styleSelection = {
    background: "rgba(36, 104, 255, 0.61)",
    color: "white",
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
                    style = {styleSelection}
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
              if (versionAdmin) {
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
                      {t('modifier')}
                      </Button>
                    </Link>
                    <Link to={`/supprimer/${piece._id}`}>
                      <Button variant="danger" className="m-1" size="sm">
                      {t('supprimer')}
                      </Button>
                    </Link>
                  </td>
                  </tr>
                );               
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
          {t('pasDePiecesRepertoire')}
        </Alert>
      );
    }
  }

  if (listeDemandes !== undefined) {
    var listeIdDemandes = Object.keys(listeDemandes);
  }

  return (
    <>
      <Table striped hover>
        <thead>
          <th>
          {t('titre')}{" "}
            <Button
              size="sm"
              variant="outline-primary"
              onClick={() => {
                setDirectionTrieTitre(
                  directionTrieTitre === "asc" ? "desc" : "asc"
                );
                TrierChamp("titre", directionTrieTitre);
              }}
            >
              {directionTrieTitre === "asc" ? "▼" : "▲"}
            </Button>
            <InputGroup size="sm" className="mt-1">
              <FormControl
                placeholder="Filtrer les titres"
                value={rechercheTitre}
                onChange={(e) => setRechercheTitre(e.target.value)}
              ></FormControl>
              <InputGroup.Append>
                {" "}
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => {
                    setRechercheTitre("");
                  }}
                >
                  Clear
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </th>
          <th>
          {t('artiste')}{" "}
            <Button
              size="sm"
              variant="outline-primary"
              onClick={() => {
                setDirectionTrieArtiste(
                  directionTrieArtiste === "asc" ? "desc" : "asc"
                );
                TrierChamp("artiste", directionTrieArtiste);
              }}
            >
              {directionTrieArtiste === "asc" ? "▼" : "▲"}
            </Button>
            <InputGroup size="sm" className="mt-1">
              <FormControl
                placeholder="Filtrer les artistes"
                value={rechercheArtiste}
                onChange={(e) => setRechercheArtiste(e.target.value)}
              ></FormControl>
              <InputGroup.Append>
                {" "}
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => {
                    setRechercheArtiste("");
                  }}
                >
                  Clear
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </th>
          <th>
          {t('categorie')}{" "}
            <Button
              size="sm"
              variant="outline-primary"
              onClick={() => {
                setDirectionTrieCategorie(
                  directionTrieCategorie === "asc" ? "desc" : "asc"
                );
                TrierChamp("categories", directionTrieCategorie);
              }}
            >
              {directionTrieCategorie === "asc" ? "▼" : "▲"}
            </Button>
            <InputGroup size="sm" className="mt-1">
              <FormControl
                placeholder="Filtrer les catégories"
                value={rechercheCat}
                onChange={(e) => setRechercheCat(e.target.value)}
              ></FormControl>
              <InputGroup.Append>
                {" "}
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => {
                    setRechercheCat("");
                  }}
                >
                  Clear
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </th>
          {()=>{
            if(versionAdmin){
              return( <th/>)
            }
          }}
        </thead>
        {RenduBodyTable()}
      </Table>

      {RenduRepertoireVide()}
      
      <Button variant="outline-danger" onClick={() => SupprimerFiltres()}>
      {t('supprimerTousLesFiltres')}
      </Button>
      <br/>
    </>
  );
}

export default ListePieces;
